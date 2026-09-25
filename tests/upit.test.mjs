import test from 'node:test'
import assert from 'node:assert/strict'
import { onRequestPost } from '../functions/api/upit.ts'

const env = { RESEND_API_KEY: 'test', RESEND_FROM_EMAIL: 'RIMAM <upiti@example.com>', INQUIRY_TO_EMAIL: 'owner@example.com', TURNSTILE_SECRET_KEY: 'test' }
const valid = { name: 'Ana Horvat', email: 'ana@example.com', message: 'Zanima me ova nekretnina.', turnstileToken: 'valid-token-123', propertySlug: 'stan-centar-zagreb', propertyTitle: 'Stan u centru Zagreba' }
const request = (body) => new Request('https://rimam.hr/api/upit', { method: 'POST', headers: { 'content-type': 'application/json', origin: 'https://rimam.hr' }, body: JSON.stringify(body) })

test('rejects missing configuration and invalid input', async () => {
  assert.equal((await onRequestPost({ request: request(valid), env: {} })).status, 503)
  assert.equal((await onRequestPost({ request: request({ ...valid, email: 'bad' }), env })).status, 400)
  assert.equal((await onRequestPost({ request: request({ ...valid, message: 'short' }), env })).status, 400)
  assert.equal((await onRequestPost({ request: request({ ...valid, propertySlug: '../bad' }), env })).status, 400)
})

test('rejects failed Turnstile and failed delivery; confirms accepted email', async () => {
  const original = globalThis.fetch
  try {
    let sent = false
    globalThis.fetch = async (url) => {
      if (String(url).includes('siteverify')) return Response.json({ success: false })
      sent = true; return Response.json({ id: '123' })
    }
    assert.equal((await onRequestPost({ request: request(valid), env })).status, 403)
    assert.equal(sent, false)
    globalThis.fetch = async (url) => String(url).includes('siteverify') ? Response.json({ success: true }) : new Response('fail', { status: 500 })
    assert.equal((await onRequestPost({ request: request(valid), env })).status, 502)
    globalThis.fetch = async (url, options) => {
      if (String(url).includes('siteverify')) return Response.json({ success: true })
      const payload = JSON.parse(options.body)
      assert.match(payload.text, /stan-centar-zagreb/)
      return Response.json({ id: '123' })
    }
    assert.equal((await onRequestPost({ request: request(valid), env })).status, 200)
  } finally { globalThis.fetch = original }
})

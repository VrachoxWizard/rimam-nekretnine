type Env = { RESEND_API_KEY?: string, RESEND_FROM_EMAIL?: string, INQUIRY_TO_EMAIL?: string, TURNSTILE_SECRET_KEY?: string }
type Context = { request: Request, env: Env }

const json = (data: object, status: number) => new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } })
const clean = (value: unknown) => typeof value === 'string' ? value.trim() : ''

export async function onRequestPost({ request, env }: Context): Promise<Response> {
  if (!env.RESEND_API_KEY || !env.RESEND_FROM_EMAIL || !env.INQUIRY_TO_EMAIL || !env.TURNSTILE_SECRET_KEY) return json({ error: 'Slanje upita trenutačno nije dostupno. Nazovite nas ili nam pišite izravno.' }, 503)
  const origin = request.headers.get('origin')
  if (origin && origin !== new URL(request.url).origin) return json({ error: 'Zahtjev nije dopušten.' }, 403)
  if (!request.headers.get('content-type')?.startsWith('application/json')) return json({ error: 'Neispravan zahtjev.' }, 415)
  if (Number(request.headers.get('content-length') || 0) > 12000) return json({ error: 'Poruka je preduga.' }, 413)
  let body: Record<string, unknown>
  try { const raw = await request.text(); if (raw.length > 12000) return json({ error: 'Poruka je preduga.' }, 413); body = JSON.parse(raw) as Record<string, unknown> } catch { return json({ error: 'Neispravan zahtjev.' }, 400) }
  const name = clean(body.name), email = clean(body.email), phone = clean(body.phone), message = clean(body.message)
  const propertyTitle = clean(body.propertyTitle), propertySlug = clean(body.propertySlug), token = clean(body.turnstileToken)
  if (clean(body.website)) return json({ error: 'Neispravan zahtjev.' }, 400)
  if (name.length < 2 || name.length > 100 || /[\r\n]/.test(name) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || phone.length > 50 || message.length < 10 || message.length > 5000 || propertyTitle.length > 180 || /[\r\n]/.test(propertyTitle) || (propertySlug && !/^[a-z0-9-]{1,100}$/.test(propertySlug)) || token.length < 10 || token.length > 2048) return json({ error: 'Provjerite obavezna polja i pokušajte ponovno.' }, 400)
  try {
    const verify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: new URLSearchParams({ secret: env.TURNSTILE_SECRET_KEY, response: token, remoteip: request.headers.get('CF-Connecting-IP') || '' }) })
    if (!verify.ok || !(await verify.json() as { success?: boolean }).success) return json({ error: 'Sigurnosna provjera nije uspjela. Pokušajte ponovno.' }, 403)
    const text = [`Ime: ${name}`, `E-pošta: ${email}`, `Telefon: ${phone || 'nije naveden'}`, propertySlug ? `Nekretnina: ${propertyTitle} (${propertySlug})` : '', '', message].filter(Boolean).join('\n')
    const sent = await fetch('https://api.resend.com/emails', { method: 'POST', headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' }, body: JSON.stringify({ from: env.RESEND_FROM_EMAIL, to: [env.INQUIRY_TO_EMAIL], reply_to: email, subject: propertyTitle ? `Upit za nekretninu: ${propertyTitle}` : `Upit sa stranice RIMAM: ${name}`, text }) })
    if (!sent.ok) return json({ error: 'Upit nije poslan. Nazovite nas ili nam pišite izravno.' }, 502)
    return json({ ok: true }, 200)
  } catch {
    return json({ error: 'Upit nije poslan. Nazovite nas ili nam pišite izravno.' }, 502)
  }
}

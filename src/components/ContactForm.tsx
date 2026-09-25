'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'

type Turnstile = { render: (element: HTMLElement, options: { sitekey: string, callback: (token: string) => void, 'expired-callback': () => void }) => string, reset: (id: string) => void, remove: (id: string) => void }
declare global { interface Window { turnstile?: Turnstile } }

const enabled = process.env.NEXT_PUBLIC_INQUIRY_ENABLED === 'true' && Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY)

export function ContactForm({ properties = [] }: { properties?: { slug: string, naslov: string }[] }) {
  const [property, setProperty] = useState<{ slug: string, naslov: string } | null>(null)
  const [token, setToken] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')
  const widget = useRef<HTMLDivElement>(null)
  const widgetId = useRef('')

  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get('nekretnina')
    setProperty(properties.find((item) => item.slug === slug) || null)
  }, [properties])
  useEffect(() => {
    if (!enabled) return
    const render = () => {
      if (!widget.current || widgetId.current || !window.turnstile) return
      widgetId.current = window.turnstile.render(widget.current, { sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!, callback: setToken, 'expired-callback': () => setToken('') })
    }
    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    script.async = true
    script.onload = render
    document.head.appendChild(script)
    render()
    return () => { if (widgetId.current) window.turnstile?.remove(widgetId.current); script.remove() }
  }, [])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!event.currentTarget.reportValidity()) return
    if (!token) { setStatus('error'); setError('Dovršite sigurnosnu provjeru.'); return }
    const form = event.currentTarget
    const data = new FormData(form)
    setStatus('sending')
    setError('')
    try {
      const response = await fetch('/api/upit', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ name: data.get('name'), email: data.get('email'), phone: data.get('phone'), message: data.get('message'), website: data.get('website'), propertySlug: property?.slug || '', propertyTitle: property?.naslov || '', turnstileToken: token }) })
      const result = await response.json() as { ok?: boolean, error?: string }
      if (!response.ok || !result.ok) throw new Error(result.error || 'Upit nije poslan. Pokušajte ponovno.')
      form.reset()
      setStatus('success')
      setToken('')
    } catch (cause) {
      setStatus('error')
      setError(cause instanceof Error ? cause.message : 'Upit nije poslan. Pokušajte ponovno.')
    } finally {
      if (widgetId.current) window.turnstile?.reset(widgetId.current)
      setToken('')
    }
  }

  if (!enabled) return <div className="contact-form contact-fallback"><h2>Javite nam se izravno.</h2>{property && <p>Upit za: <strong>{property.naslov}</strong></p>}<p>Obrazac za automatsko slanje još nije povezan. Za razgovor o nekretnini nazovite nas ili pošaljite e-poštu.</p><a className="button button-dark" href="tel:+38598250447">Nazovite +385 98 250 447 <span>↗</span></a><a className="text-link" href={`mailto:robert.ruzic67@gmail.com${property ? `?subject=${encodeURIComponent(`Upit za nekretninu: ${property.naslov} (${property.slug})`)}` : ''}`}>Pošaljite e-poštu ↗</a></div>
  return <form className="contact-form" onSubmit={submit}><h2>Pošaljite upit</h2>{property && <p className="form-property">Upit za: <strong>{property.naslov}</strong> <small>#{property.slug}</small></p>}<label>Ime i prezime<input name="name" autoComplete="name" minLength={2} maxLength={100} required /></label><label>E-pošta<input name="email" type="email" autoComplete="email" maxLength={254} required /></label><label>Telefon, neobavezno<input name="phone" type="tel" autoComplete="tel" maxLength={50} /></label><label>Poruka<textarea name="message" rows={5} minLength={10} maxLength={5000} required /></label><input className="honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" /><div ref={widget} className="turnstile-slot" /><button className="button button-dark" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Šaljemo upit…' : 'Pošaljite upit'} <span>↗</span></button>{status === 'success' && <p role="status" className="form-success">Upit je uspješno poslan. Javit ćemo vam se uskoro.</p>}{status === 'error' && <p role="alert" className="form-status">{error} Možete nas nazvati na <a href="tel:+38598250447">+385 98 250 447</a>.</p>}</form>
}

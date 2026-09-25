'use client'

import Link from 'next/link'
import { useEffect, useRef, useState, type FormEvent } from 'react'

type Turnstile = { render: (element: HTMLElement, options: { sitekey: string, callback: (token: string) => void, 'expired-callback': () => void }) => string, reset: (id: string) => void, remove: (id: string) => void }
declare global { interface Window { turnstile?: Turnstile } }

const enabled = process.env.NEXT_PUBLIC_INQUIRY_ENABLED === 'true' && Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY)
const email = 'ana-marija@rimam.hr'

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
    return () => { if (widgetId.current) window.turnstile?.remove(widgetId.current); widgetId.current = ''; script.remove() }
  }, [])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!enabled || !event.currentTarget.reportValidity()) return
    if (!token) { setStatus('error'); setError('Dovršite sigurnosnu provjeru.'); return }
    const form = event.currentTarget
    const data = new FormData(form)
    setStatus('sending')
    setError('')
    try {
      const response = await fetch('/api/upit', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ name: data.get('name'), email: data.get('email'), phone: data.get('phone'), message: `Tema: ${data.get('interest')}\n\n${data.get('message')}`, website: data.get('website'), propertySlug: property?.slug || '', propertyTitle: property?.naslov || '', turnstileToken: token }) })
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

  const mailto = `mailto:${email}${property ? `?subject=${encodeURIComponent(`Upit za nekretninu: ${property.naslov} (${property.slug})`)}` : ''}`

  return <form className="contact-form" onSubmit={submit} aria-labelledby="contact-form-title">
    <div className="contact-form-head"><span className="eyebrow">Vaša poruka</span><span className="form-step">RIMAM / KONTAKT</span></div>
    <h2 id="contact-form-title">Recite nam što<br /><em>vam je važno.</em></h2>
    <p className="form-intro">Nekoliko osnovnih informacija pomoći će nam da započnemo razgovor.</p>
    {property && <p className="form-property">Upit za nekretninu <strong>{property.naslov}</strong> <small>#{property.slug}</small></p>}
    {!enabled && <p className="form-unavailable" role="status"><span aria-hidden="true">○</span> Pregled obrasca · Slanje će biti dostupno nakon povezivanja e-pošte. Dotad nam <a href={mailto}>pošaljite e-poštu</a> ili nas nazovite.</p>}
    <fieldset className="form-fields" disabled={!enabled}>
      <div className="form-row"><label>Ime i prezime <span>*</span><input name="name" autoComplete="name" placeholder="Vaše ime i prezime" minLength={2} maxLength={100} required /></label><label>E-pošta <span>*</span><input name="email" type="email" autoComplete="email" placeholder="ime@primjer.hr" maxLength={254} required /></label></div>
      <div className="form-row"><label>Telefon <small>Neobavezno</small><input name="phone" type="tel" autoComplete="tel" placeholder="+385 …" maxLength={50} /></label><label>Tema upita <span>*</span><select name="interest" defaultValue="" required><option value="" disabled>Odaberite temu</option><option value="Kupnja">Kupnja</option><option value="Prodaja">Prodaja</option><option value="Najam">Najam</option><option value="Drugo">Drugo</option></select></label></div>
      <label>Vaša poruka <span>*</span><textarea name="message" rows={5} placeholder="Opišite prostor koji tražite ili nekretninu o kojoj želite razgovarati…" minLength={10} maxLength={4800} required /></label>
      <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
    </fieldset>
    {enabled && <div ref={widget} className="turnstile-slot" />}
    <div className="form-action"><button className="button button-dark" type="submit" disabled={!enabled || status === 'sending'}>{enabled ? status === 'sending' ? 'Šaljemo upit…' : 'Pošaljite upit' : 'Slanje uskoro dostupno'} <span>↗</span></button>{enabled ? <p>Slanjem upita prihvaćate obradu podataka prema <Link href="/privatnost/">pravilima privatnosti</Link>.</p> : <p>Polja su prikaz budućeg obrasca; podaci se trenutačno ne prikupljaju.</p>}</div>
    {!enabled && <div className="form-direct"><a href={mailto}>Pošaljite e-poštu <span>↗</span></a><a href="tel:+38598250447">Nazovite nas <span>↗</span></a></div>}
    {status === 'success' && <p role="status" className="form-success">Upit je uspješno poslan. Javit ćemo vam se uskoro.</p>}
    {status === 'error' && <p role="alert" className="form-status">{error} Možete nas nazvati na <a href="tel:+38598250447">+385 98 250 447</a>.</p>}
  </form>
}

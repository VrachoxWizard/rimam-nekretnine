'use client'

import { useState, type FormEvent } from 'react'

export function ContactForm() {
  const [error, setError] = useState('')
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.reportValidity()) return
    const data = new FormData(form)
    const name = String(data.get('name') || '').trim()
    const email = String(data.get('email') || '').trim()
    const message = String(data.get('message') || '').trim()
    if (!name || !email || !message) { setError('Ispunite sva obavezna polja.'); return }
    const subject = encodeURIComponent(`Upit sa stranice RIMAM: ${name}`)
    const body = encodeURIComponent(`Ime: ${name}\nE-pošta: ${email}\n\n${message}`)
    window.location.href = `mailto:robert.ruzic67@gmail.com?subject=${subject}&body=${body}`
    setError('Otvoren je vaš program za e-poštu. Pošaljite pripremljenu poruku kako bismo je primili.')
  }
  return <form className="contact-form" onSubmit={submit}><h2>Pošaljite upit</h2><label>Ime i prezime<input name="name" autoComplete="name" required /></label><label>E-pošta<input name="email" type="email" autoComplete="email" required /></label><label>Poruka<textarea name="message" rows={5} required /></label><button className="button button-dark" type="submit">Pripremi e-poruku <span>↗</span></button><p className="form-note">Otvorit će se vaš program za e-poštu. Poruka se ne šalje automatski.</p>{error && <p role="status" className="form-status">{error}</p>}</form>
}

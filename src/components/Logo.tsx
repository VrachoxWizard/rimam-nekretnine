import Link from 'next/link'

export function Logo({ light = false }: { light?: boolean }) {
  return <Link href="/" className={`logo ${light ? 'logo-light' : ''}`} aria-label="RIMAM nekretnine, početna stranica">
    <svg className="logo-mark" viewBox="0 0 64 64" aria-hidden="true"><path d="M6 45V19l13 15 13-15 13 15 13-15v26" /></svg>
    <span className="logo-word"><strong>RIMAM</strong><small>NEKRETNINE</small></span>
  </Link>
}

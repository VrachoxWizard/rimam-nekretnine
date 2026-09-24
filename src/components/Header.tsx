'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from './Logo'

const links = [
  ['Nekretnine', '/nekretnine/'],
  ['O nama', '/o-nama/'],
  ['Usluge', '/usluge/'],
  ['Kontakt', '/kontakt/'],
] as const

export function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  return <header className="site-header">
    <div className="header-inner container">
      <Logo />
      <nav className={open ? 'main-nav is-open' : 'main-nav'} aria-label="Glavna navigacija">
        {links.map(([name, href]) => <Link key={href} href={href} className={pathname === href ? 'active' : ''} onClick={() => setOpen(false)}>{name}</Link>)}
        <a className="mobile-call" href="tel:+38598250447">Nazovite nas</a>
      </nav>
      <a className="header-contact" href="tel:+38598250447">+385 98 250 447 <span aria-hidden="true">↗</span></a>
      <button className="menu-toggle" type="button" aria-label={open ? 'Zatvori izbornik' : 'Otvori izbornik'} aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /></button>
    </div>
  </header>
}

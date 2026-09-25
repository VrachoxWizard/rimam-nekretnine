import Link from 'next/link'
import { Logo } from './Logo'

export function Footer() {
  return <footer className="site-footer">
    <div className="container footer-top">
      <div><Logo light /><p>Prostor za prave odluke.</p></div>
      <div className="footer-links"><Link href="/nekretnine/">Nekretnine</Link><Link href="/o-nama/">O nama</Link><Link href="/usluge/">Usluge</Link><Link href="/kontakt/">Kontakt</Link></div>
      <div className="footer-contact"><span>Razgovarajmo o vašoj nekretnini.</span><a href="tel:+38598250447">+385 98 250 447</a><a href="mailto:ana-marija@rimam.hr">ana-marija@rimam.hr</a></div>
    </div>
    <div className="container footer-bottom"><span>© {new Date().getFullYear()} RIMAM d.o.o. · Trnsko 1b, Zagreb · OIB 98938344438</span><Link href="/privatnost/">Privatnost</Link></div>
  </footer>
}

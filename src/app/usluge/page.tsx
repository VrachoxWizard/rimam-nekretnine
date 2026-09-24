import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Usluge', description: 'RIMAM pruža usluge povezane s prodajom, kupnjom i najmom nekretnina u Zagrebu i Hrvatskoj.', alternates: { canonical: '/usluge/' } }

const services = [
  ['Prodaja nekretnine', 'Jasna prezentacija, kvalitetne fotografije i izravna komunikacija s zainteresiranim kupcima.'],
  ['Kupnja nekretnine', 'Razgovor o prioritetima, odabir relevantnih prostora i informacije potrebne za sigurniju odluku.'],
  ['Najam i iznajmljivanje', 'Podrška pri predstavljanju i pronalasku nekretnina za najam.'],
]
export default function Usluge() { return <main id="sadrzaj" className="container page-shell"><div className="page-intro"><p className="eyebrow">Usluge</p><h1>Pravi prostor.<br /><em>Jasan put do njega.</em></h1><p>Bez obzira na to prodajete li, kupujete ili tražite najam, prvi korak je razgovor.</p></div><div className="services-list">{services.map(([title, description], i) => <article key={title}><span>0{i + 1}</span><h2>{title}</h2><p>{description}</p><Link href="/kontakt/" aria-label={`Upit: ${title}`}>↗</Link></article>)}</div><div className="service-cta"><h2>Recite nam što vam je važno.</h2><Link className="button button-dark" href="/kontakt/">Kontaktirajte nas <span>↗</span></Link></div></main> }

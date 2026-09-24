import Image from 'next/image'
import Link from 'next/link'
import { PropertyCard } from '@/components/PropertyCard'
import { sveNekretnine } from '@/lib/nekretnine'

export default function Home() {
  const items = sveNekretnine().slice(0, 3)
  return <main id="sadrzaj">
    <section className="hero"><Image src="/images/hero.webp" alt="Svijetao interijer stana s pogledom na Zagreb, konceptualna fotografija" fill priority sizes="100vw" className="hero-photo" /><div className="hero-shade" /><div className="container hero-inner"><div className="hero-copy"><p className="eyebrow light">RIMAM · Zagreb od 1993.</p><h1>Prostor za<br /><em>prave odluke.</em></h1><p>Pronađite nekretninu koja ima smisla za vaš sljedeći korak.</p><Link className="button button-light" href="/nekretnine/">Istražite nekretnine <span>↗</span></Link></div></div><div className="hero-index">RIMAM / NEKRETNINE</div></section>
    <section className="intro-strip container"><p>Pažljivo predstavljanje nekretnina.<br />Osobni pristup svakom razgovoru.</p><Link href="/o-nama/" className="text-link">Upoznajte RIMAM <span>↗</span></Link></section>
    <section className="section featured container"><div className="section-heading"><div><p className="eyebrow">Odabrani prostori</p><h2>Nekretnine koje<br /><em>vrijedi pogledati.</em></h2></div><Link className="text-link" href="/nekretnine/">Cijela ponuda <span>↗</span></Link></div>{items.length ? <div className="property-grid">{items.map((item) => <PropertyCard key={item.slug} item={item} />)}</div> : <div className="empty-state"><p>Uskoro predstavljamo nove nekretnine.</p><Link href="/kontakt/">Pošaljite upit ↗</Link></div>}</section>
    <section className="editorial-section"><div className="editorial-image"><Image src="/images/stan-klasika.webp" alt="Svijetao interijer klasičnog gradskog stana, konceptualna fotografija" fill sizes="(max-width: 800px) 100vw, 50vw" /></div><div className="editorial-copy"><span className="accent-line" /><p className="eyebrow">Više od adrese</p><h2>Dom se ne bira samo brojkama.</h2><p>Svaka nekretnina ima svoj karakter. Naš je posao prepoznati što je važno vama, predstaviti prostor pošteno i pomoći da odlučite s povjerenjem.</p><Link className="text-link" href="/usluge/">Kako radimo <span>↗</span></Link></div></section>
    <section className="section process container"><div><p className="eyebrow">Naš pristup</p><h2>Jasno. Osobno.<br /><em>Bez suvišnih koraka.</em></h2></div><div className="process-list"><div><span>01</span><h3>Razgovor</h3><p>Najprije razumijemo što tražite ili želite prodati.</p></div><div><span>02</span><h3>Prava prezentacija</h3><p>Ističemo bitne informacije i kvalitetne fotografije.</p></div><div><span>03</span><h3>Odluka s povjerenjem</h3><p>Ostajemo dostupni kroz cijeli proces.</p></div></div></section>
    <section className="closing-cta"><div className="container"><p className="eyebrow">Vaš sljedeći korak</p><h2>Imate nekretninu<br />ili tražite novu?</h2><Link className="button button-dark" href="/kontakt/">Razgovarajmo <span>↗</span></Link></div></section>
  </main>
}


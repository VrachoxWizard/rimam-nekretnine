import Link from 'next/link'
import { PropertyCard } from '@/components/PropertyCard'
import { ResponsiveImage } from '@/components/ResponsiveImage'
import { sveNekretnine } from '@/lib/nekretnine'

const services = [
  { id: 'prodaja', title: 'Prodaja', description: 'Jasna prezentacija prostora, cijene i detalja koji kupcu pomažu odlučiti što želi vidjeti uživo.' },
  { id: 'kupnja', title: 'Kupnja', description: 'Od lokacije do rasporeda: usmjerite potragu prema prostoru koji odgovara vašem životu i planovima.' },
  { id: 'najam', title: 'Najam', description: 'Tražite novi prostor ili ga želite ponuditi? Počnimo od uvjeta koji su vam važni.' },
]

export default async function Home() {
  const items = (await sveNekretnine()).slice(0, 3)
  return <main id="sadrzaj">
    <section className="hero">
      <ResponsiveImage src="/optimized/images/hero.webp-1600.webp" alt="Svijetao interijer stana s pogledom na Zagreb, konceptualna fotografija" width={1600} height={1000} loading="eager" fetchPriority="high" sizes="100vw" className="hero-photo" />
      <div className="hero-shade" />
      <div className="container hero-inner"><div className="hero-copy"><p className="eyebrow light">RIMAM · Zagreb od 1993.</p><h1>Prostor za<br /><em>prave odluke.</em></h1><p>Stan, kuća ili poslovni prostor. Pronađite mjesto za svoj sljedeći korak.</p><Link className="button button-light" href="/nekretnine/">Istražite nekretnine <span>↗</span></Link></div></div>
    </section>

    <section className="home-services container" aria-labelledby="home-services-title">
      <div className="home-services-intro" data-reveal><p className="eyebrow">Kako vam možemo pomoći</p><h2 id="home-services-title">Tri puta do<br /><em>pravog prostora.</em></h2><p>Bez obzira na to s koje strane tržišta dolazite, dobar početak je jasan razgovor.</p></div>
      <div className="home-services-grid">{services.map((service) => <Link href={`/usluge/#${service.id}`} className="home-service" key={service.title} data-reveal><span className="home-service-arrow" aria-hidden="true">↗</span><h3>{service.title}</h3><p>{service.description}</p></Link>)}</div>
    </section>

    <section className="section featured container" aria-labelledby="featured-title"><div className="section-heading" data-reveal><div><p className="eyebrow">Odabrani prostori</p><h2 id="featured-title">Nekretnine koje<br /><em>vrijedi pogledati.</em></h2></div><Link className="text-link" href="/nekretnine/">Cijela ponuda <span>↗</span></Link></div>{items.length ? <div className="property-grid">{items.map((item) => <PropertyCard key={item.slug} item={item} />)}</div> : <div className="empty-state"><p>Uskoro predstavljamo nove nekretnine.</p><Link href="/kontakt/">Pošaljite upit ↗</Link></div>}</section>

    <section className="editorial-section" aria-labelledby="editorial-title"><div className="editorial-image"><ResponsiveImage src="/optimized/images/interijer-detalj.webp-1600.webp" alt="Arhitektonski detalj sunčanog interijera, konceptualna fotografija" width={1600} height={1000} loading="lazy" sizes="(max-width: 800px) 100vw, 52vw" /></div><div className="editorial-copy" data-reveal><p className="eyebrow">Više od adrese</p><h2 id="editorial-title">Dom se ne bira samo brojkama.</h2><p>Kvadratura je tek početak. Svjetlo u dnevnoj sobi, raspored koji vam odgovara i osjećaj kada uđete u prostor često kažu više od oglasa.</p><p>Zato fotografije i podaci trebaju otvoriti prava pitanja, a razgovor pomoći da dođete do odgovora.</p><Link className="text-link" href="/o-nama/">Upoznajte nas <span>↗</span></Link></div></section>

    <section className="process-visual" aria-labelledby="process-title"><div className="process-photo"><ResponsiveImage src="/optimized/images/zagreb-fasada.webp-1600.webp" alt="Ilustrativna fotografija gradske arhitekture" width={1600} height={1000} loading="lazy" sizes="(max-width: 800px) 100vw, 48vw" /></div><div className="process-content" data-reveal><p className="eyebrow">Naš pristup</p><h2 id="process-title">Dobra odluka<br /><em>ima svoj red.</em></h2><div className="process-list"><div><span>01</span><h3>Razgovor</h3><p>Recite nam što tražite, što prodajete i koji su vam uvjeti važni.</p></div><div><span>02</span><h3>Pregled prostora</h3><p>Fotografije, lokacija i ključni podaci pomažu suziti izbor prije obilaska.</p></div><div><span>03</span><h3>Sljedeći korak</h3><p>Kada prostor privuče pažnju, dogovaramo razgovor i dodatne informacije.</p></div></div></div></section>

    <section className="closing-cta" aria-labelledby="closing-title"><ResponsiveImage src="/optimized/images/mediteransko-dvoriste.webp-1600.webp" alt="Kameno mediteransko dvorište, konceptualna fotografija" width={1600} height={1000} loading="lazy" sizes="100vw" className="closing-photo" /><div className="closing-shade" /><div className="container closing-content" data-reveal><p className="eyebrow light">Vaš sljedeći korak</p><h2 id="closing-title">Prostor vrijedi<br /><em>vidjeti uživo.</em></h2><p>Prodajete, kupujete ili tražite najam? Recite nam što planirate i dogovorimo razgovor o sljedećem koraku.</p><Link className="button button-light" href="/kontakt/">Razgovarajmo <span>↗</span></Link></div></section>
  </main>
}

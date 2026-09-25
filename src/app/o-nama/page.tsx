import type { Metadata } from 'next'
import Link from 'next/link'
import { ResponsiveImage } from '@/components/ResponsiveImage'

export const metadata: Metadata = { title: 'O nama', description: 'Upoznajte RIMAM d.o.o., agenciju za poslovanje nekretninama sa sjedištem u Zagrebu.', alternates: { canonical: '/o-nama/' } }

export default function ONama() { return <main id="sadrzaj">
  <section className="page-intro container about-intro"><p className="eyebrow">O nama</p><h1>Nekretnine su osobne.<br /><em>I naš pristup je.</em></h1><p>RIMAM d.o.o. agencija je za poslovanje nekretninama sa sjedištem u Zagrebu. Radimo s ljudima koji prodaju, kupuju ili traže prostor za najam.</p></section>
  <section className="about-visual"><ResponsiveImage src="/optimized/images/zagreb-fasada.webp-1600.webp" alt="Ilustrativna fotografija gradske arhitekture u jutarnjem svjetlu" width={1600} height={1000} loading="eager" sizes="100vw" /></section>
  <section className="about-story container" aria-labelledby="about-story-title"><div data-reveal><p className="eyebrow">RIMAM · Zagreb</p><h2 id="about-story-title">Dobar posao počinje dobrim razgovorom.</h2></div><div data-reveal><p>Od 1993. RIMAM posluje u Zagrebu. Razgovor o nekretnini za nas počinje onim što je važno vama: lokacijom, načinom života, planovima i mogućnostima.</p><p>Oglas može pokazati raspored i cijenu. Osobni razgovor daje prostor pitanjima koja se ne vide na fotografiji. Zato nam se slobodno javite i kada još istražujete mogućnosti.</p><Link href="/kontakt/" className="text-link">Javite nam se <span>↗</span></Link></div></section>
  <section className="about-montage" aria-label="Vizualni svijet RIMAM"><div><ResponsiveImage src="/optimized/images/interijer-detalj.webp-1600.webp" alt="Svjetlo na detaljima suvremenog interijera, konceptualna fotografija" width={1600} height={1000} loading="lazy" sizes="(max-width: 760px) 100vw, 58vw" /></div><div><ResponsiveImage src="/optimized/images/mediteransko-dvoriste.webp-1600.webp" alt="Kameno dvorište s maslinom, konceptualna fotografija" width={1600} height={1000} loading="lazy" sizes="(max-width: 760px) 100vw, 42vw" /></div></section>
  <section className="about-ending container" data-reveal><p className="eyebrow">Važan je osjećaj</p><h2>Adresa je početak.<br /><em>Odluka je osobna.</em></h2><p>Pronađite prostor u kojem se možete zamisliti. Ako ga tek planirate prodati, razgovarajmo o tome kako ga jasno predstaviti.</p><Link className="button button-dark" href="/kontakt/">Počnimo razgovor <span>↗</span></Link></section>
</main> }

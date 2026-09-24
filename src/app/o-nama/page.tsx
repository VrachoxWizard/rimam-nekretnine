import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = { title: 'O nama', description: 'Upoznajte RIMAM d.o.o., agenciju za poslovanje nekretninama sa sjedištem u Zagrebu.', alternates: { canonical: '/o-nama/' } }

export default function ONama() { return <main id="sadrzaj"><section className="page-intro container"><p className="eyebrow">O nama</p><h1>Nekretnine su osobne.<br /><em>I naš pristup je.</em></h1><p>RIMAM d.o.o. agencija je za poslovanje nekretninama sa sjedištem u Zagrebu.</p></section><section className="about-visual"><Image src="/images/hero.webp" alt="Arhitektonski interijer s pogledom na Zagreb, konceptualna fotografija" fill sizes="100vw" /></section><section className="section container about-copy"><p className="big-statement">Vjerujemo da dobar posao počinje dobrim razgovorom.</p><div><p>Od 1993. RIMAM posluje u Zagrebu. Naš pristup temelji se na jasnim informacijama, pažljivoj prezentaciji prostora i izravnoj komunikaciji.</p><p>Kada prodajete, iznajmljujete ili tražite nekretninu, važno je imati nekoga tko sluša i odgovara konkretno.</p><Link href="/kontakt/" className="text-link">Upoznajmo se <span>↗</span></Link></div></section></main> }


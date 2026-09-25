import type { Metadata } from 'next'
import { ContactForm } from '@/components/ContactForm'
import { ResponsiveImage } from '@/components/ResponsiveImage'
import { sveNekretnine } from '@/lib/nekretnine'

export const metadata: Metadata = { title: 'Kontakt', description: 'Kontaktirajte RIMAM d.o.o. u Zagrebu. Telefon +385 98 250 447. Adresa: Trnsko 1b, Zagreb.', alternates: { canonical: '/kontakt/' } }

export default async function Kontakt() {
  const items = await sveNekretnine()
  return <main id="sadrzaj" className="contact-page container">
    <header className="contact-intro"><div><p className="eyebrow">Kontakt · Zagreb</p><h1>Počnimo<br /><em>razgovorom.</em></h1></div><p>Imate pitanje o nekretnini ili želite predstaviti svoju? Recite nam što vam je važno. Dobar razgovor prvi je korak prema pravoj odluci.</p></header>
    <div className="contact-layout"><aside className="contact-aside"><div className="contact-visual"><ResponsiveImage src="/optimized/images/interijer-detalj.webp-1600.webp" alt="Svjetlo u suvremenom interijeru, konceptualna fotografija" width={1600} height={1000} loading="eager" sizes="(max-width: 760px) 100vw, 45vw" /><span>RIMAM / PROSTOR ZA PRAVE ODLUKE</span></div><div className="contact-details"><div><span>Razgovarajmo telefonom</span><a href="tel:+38598250447">+385 98 250 447 <b aria-hidden="true">↗</b></a></div><div><span>Pišite nam</span><a href="mailto:ana-marija@rimam.hr">ana-marija@rimam.hr <b aria-hidden="true">↗</b></a></div><div><span>Naša adresa</span><p>Trnsko 1b · 10000 Zagreb</p></div></div></aside><ContactForm properties={items.map(({ slug, naslov }) => ({ slug, naslov }))} /></div>
  </main>
}

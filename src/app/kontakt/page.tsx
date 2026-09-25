import type { Metadata } from 'next'
import { ContactForm } from '@/components/ContactForm'
import { sveNekretnine } from '@/lib/nekretnine'

export const metadata: Metadata = { title: 'Kontakt', description: 'Kontaktirajte RIMAM d.o.o. u Zagrebu. Telefon +385 98 250 447. Adresa: Trnsko 1b, Zagreb.', alternates: { canonical: '/kontakt/' } }

export default async function Kontakt() { const items = await sveNekretnine(); return <main id="sadrzaj" className="container page-shell"><div className="page-intro"><p className="eyebrow">Kontakt</p><h1>Počnimo<br /><em>razgovorom.</em></h1><p>Imate pitanje o nekretnini ili želite predstaviti svoju? Javite nam se.</p></div><div className="contact-layout"><div className="contact-details"><div><span>Telefon</span><a href="tel:+38598250447">+385 98 250 447</a></div><div><span>E-pošta</span><a href="mailto:robert.ruzic67@gmail.com">robert.ruzic67@gmail.com</a></div><div><span>Sjedište</span><p>Trnsko 1b<br />10000 Zagreb, Hrvatska</p></div></div><ContactForm properties={items.map(({ slug, naslov }) => ({ slug, naslov }))} /></div></main> }

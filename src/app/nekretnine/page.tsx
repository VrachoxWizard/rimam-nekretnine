import type { Metadata } from 'next'
import { PropertyFilters } from '@/components/PropertyFilters'
import { sveNekretnine } from '@/lib/nekretnine'

export const metadata: Metadata = { title: 'Nekretnine za prodaju i najam', description: 'Pregledajte nekretnine za prodaju i najam. Filtrirajte prema vrsti, lokaciji, cijeni, površini i broju soba.', alternates: { canonical: '/nekretnine/' } }

export default async function Nekretnine() {
  const items = await sveNekretnine()
  return <main id="sadrzaj" className="page-shell container"><div className="page-intro"><p className="eyebrow">Ponuda RIMAM</p><h1>Pronađite prostor<br /><em>za svoju priču.</em></h1><p>Pregledajte ponudu i suzite izbor prema onome što vam je doista važno.</p></div>{items.some((item) => item.primjer) && <p className="demo-banner">Prikazani oglasi služe kao primjer dizajna. Trenutačno nisu stvarna ponuda.</p>}<PropertyFilters items={items} /></main>
}

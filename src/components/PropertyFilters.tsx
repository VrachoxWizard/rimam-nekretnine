'use client'

import { useMemo, useState } from 'react'
import { PropertyCard } from './PropertyCard'
import type { Nekretnina } from '@/lib/property'

export function PropertyFilters({ items }: { items: Nekretnina[] }) {
  const [namjena, setNamjena] = useState('sve')
  const [vrsta, setVrsta] = useState('sve')
  const [lokacija, setLokacija] = useState('')
  const [maxCijena, setMaxCijena] = useState('')
  const [minPovrsina, setMinPovrsina] = useState('')
  const [minSobe, setMinSobe] = useState('')
  const [open, setOpen] = useState(false)

  const filtered = useMemo(() => items.filter((item) =>
    (namjena === 'sve' || item.namjena === namjena) &&
    (vrsta === 'sve' || item.vrsta === vrsta) &&
    item.lokacija.toLocaleLowerCase('hr').includes(lokacija.toLocaleLowerCase('hr')) &&
    (!maxCijena || item.cijena <= Number(maxCijena)) &&
    (!minPovrsina || item.povrsina >= Number(minPovrsina)) &&
    (!minSobe || (item.sobe || 0) >= Number(minSobe))
  ), [items, namjena, vrsta, lokacija, maxCijena, minPovrsina, minSobe])

  const reset = () => { setNamjena('sve'); setVrsta('sve'); setLokacija(''); setMaxCijena(''); setMinPovrsina(''); setMinSobe('') }
  return <>
    <div className="filter-head"><span>{filtered.length} {filtered.length === 1 ? 'nekretnina' : 'nekretnine'}</span><button className="filter-toggle" onClick={() => setOpen(!open)} aria-expanded={open}>{open ? 'Sakrij filtre' : 'Filtriraj ponudu'} <span aria-hidden="true">{open ? '−' : '+'}</span></button></div>
    <div className={`filters ${open ? 'filters-open' : ''}`}>
      <label>Ponuda<select value={namjena} onChange={(e) => setNamjena(e.target.value)}><option value="sve">Sve</option><option value="prodaja">Prodaja</option><option value="najam">Najam</option></select></label>
      <label>Vrsta<select value={vrsta} onChange={(e) => setVrsta(e.target.value)}><option value="sve">Sve vrste</option><option value="stan">Stan</option><option value="kuca">Kuća</option><option value="zemljiste">Zemljište</option><option value="poslovni">Poslovni prostor</option></select></label>
      <label>Lokacija<input type="search" placeholder="Grad ili četvrt" value={lokacija} onChange={(e) => setLokacija(e.target.value)} /></label>
      <label>Cijena do €<input type="number" min="0" placeholder="Bez ograničenja" value={maxCijena} onChange={(e) => setMaxCijena(e.target.value)} /></label>
      <label>Površina od m²<input type="number" min="0" placeholder="Bilo koja" value={minPovrsina} onChange={(e) => setMinPovrsina(e.target.value)} /></label>
      <label>Najmanje soba<input type="number" min="0" placeholder="Bilo koliko" value={minSobe} onChange={(e) => setMinSobe(e.target.value)} /></label>
      <button className="reset-filter" type="button" onClick={reset}>Poništi filtre</button>
    </div>
    {filtered.length ? <div className="property-grid">{filtered.map((item) => <PropertyCard key={item.slug} item={item} />)}</div> : <div className="empty-state"><h2>Nema nekretnina za odabrane filtre.</h2><p>Pokušajte s drugim kriterijima ili nam pošaljite upit.</p><button onClick={reset}>Prikaži sve nekretnine</button></div>}
  </>
}

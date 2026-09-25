'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { PropertyCard } from './PropertyCard'
import type { Nekretnina } from '@/lib/property'

type Filters = { namjena: string, vrsta: string, lokacija: string, cijena: string, povrsina: string, sobe: string }
const empty: Filters = { namjena: '', vrsta: '', lokacija: '', cijena: '', povrsina: '', sobe: '' }
const names: Record<keyof Filters, string> = { namjena: 'Ponuda', vrsta: 'Vrsta', lokacija: 'Lokacija', cijena: 'Cijena do', povrsina: 'Površina od', sobe: 'Soba od' }

function fromUrl(): Filters {
  const params = new URLSearchParams(window.location.search)
  return Object.fromEntries(Object.keys(empty).map((key) => [key, params.get(key) || ''])) as Filters
}

export function PropertyFilters({ items }: { items: Nekretnina[] }) {
  const [filters, setFilters] = useState<Filters>(empty)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const sync = () => setFilters(fromUrl())
    sync()
    window.addEventListener('popstate', sync)
    return () => window.removeEventListener('popstate', sync)
  }, [])

  function change(next: Filters) {
    setFilters(next)
    const url = new URL(window.location.href)
    Object.entries(next).forEach(([key, value]) => value ? url.searchParams.set(key, value) : url.searchParams.delete(key))
    window.history.pushState(null, '', `${url.pathname}${url.search}${url.hash}`)
  }
  const set = (key: keyof Filters, value: string) => change({ ...filters, [key]: value })
  const filtered = useMemo(() => items.filter((item) =>
    (!filters.namjena || item.namjena === filters.namjena) &&
    (!filters.vrsta || item.vrsta === filters.vrsta) &&
    item.lokacija.toLocaleLowerCase('hr').includes(filters.lokacija.toLocaleLowerCase('hr')) &&
    (!filters.cijena || item.cijena <= Number(filters.cijena)) &&
    (!filters.povrsina || item.povrsina >= Number(filters.povrsina)) &&
    (!filters.sobe || (item.sobe || 0) >= Number(filters.sobe))
  ), [items, filters])
  const active = Object.entries(filters).filter(([, value]) => value) as [keyof Filters, string][]
  const countLabel = `${filtered.length} ${filtered.length === 1 ? 'nekretnina' : filtered.length >= 2 && filtered.length <= 4 ? 'nekretnine' : 'nekretnina'}`

  return <section className="listing-controls" aria-label="Filtri nekretnina">
    <div className="quick-filters" role="group" aria-label="Vrsta ponude">
      {[['', 'Sve'], ['prodaja', 'Prodaja'], ['najam', 'Najam']].map(([value, label]) => <button key={value} type="button" aria-pressed={filters.namjena === value} onClick={() => set('namjena', value)}>{label}</button>)}
    </div>
    <div className="filter-head"><span role="status">{countLabel}</span><button type="button" className="filter-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="filter-panel">{open ? 'Sakrij filtre' : 'Više filtara'} <span aria-hidden="true">{open ? '−' : '+'}</span></button></div>
    <div id="filter-panel" className={`filters ${open ? 'filters-open' : ''}`} inert={!open}>
      <label>Vrsta<select value={filters.vrsta} onChange={(e) => set('vrsta', e.target.value)}><option value="">Sve vrste</option><option value="stan">Stan</option><option value="kuca">Kuća</option><option value="zemljiste">Zemljište</option><option value="poslovni">Poslovni prostor</option></select></label>
      <label>Lokacija<input type="search" placeholder="Grad ili četvrt" value={filters.lokacija} onChange={(e) => set('lokacija', e.target.value)} /></label>
      <label>Cijena do €<input type="number" min="0" placeholder="Bez ograničenja" value={filters.cijena} onChange={(e) => set('cijena', e.target.value)} /></label>
      <label>Površina od m²<input type="number" min="0" placeholder="Bilo koja" value={filters.povrsina} onChange={(e) => set('povrsina', e.target.value)} /></label>
      <label>Najmanje soba<input type="number" min="0" placeholder="Bilo koliko" value={filters.sobe} onChange={(e) => set('sobe', e.target.value)} /></label>
      <button className="reset-filter" type="button" onClick={() => change(empty)}>Poništi sve</button>
      <button className="filter-done button button-dark" type="button" onClick={() => setOpen(false)}>Prikaži {countLabel}</button>
    </div>
    {active.length > 0 && <div className="active-filters" aria-label="Aktivni filtri">{active.map(([key, value]) => <button type="button" key={key} onClick={() => set(key, '')} aria-label={`Ukloni filtar ${names[key]}`}><span>{names[key]}: {value}</span> ×</button>)}<button type="button" onClick={() => change(empty)}>Poništi sve</button></div>}
    {filtered.length ? <div className="property-grid">{filtered.map((item, index) => <PropertyCard key={item.slug} item={item} priority={index === 0} />)}</div> : <div className="empty-state"><h2>Nema nekretnina za odabrane filtre.</h2><p>Promijenite kriterije ili nam recite što tražite.</p><div className="empty-actions"><button onClick={() => change(empty)}>Poništi filtre</button><Link href="/kontakt/">Pošaljite upit ↗</Link></div></div>}
  </section>
}

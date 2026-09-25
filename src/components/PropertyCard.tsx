import Link from 'next/link'
import { formatCijena, nazivVrste, type Nekretnina } from '@/lib/property'
import { ResponsiveImage } from './ResponsiveImage'

export function PropertyCard({ item, priority = false }: { item: Nekretnina, priority?: boolean }) {
  return <article className="property-card">
    <Link href={`/nekretnine/${item.slug}/`} className="property-image-link" aria-label={`Pogledajte: ${item.naslov}`}>
      <ResponsiveImage src={item.naslovna} alt={`${nazivVrste[item.vrsta]} u mjestu ${item.lokacija}`} width={900} height={650} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" />
      <span className="image-arrow" aria-hidden="true">↗</span>
    </Link>
    <div className="property-meta"><span>{item.lokacija}</span><span>{item.namjena === 'prodaja' ? 'Prodaja' : 'Najam'}</span></div>
    <Link href={`/nekretnine/${item.slug}/`} className="property-title">{item.naslov}</Link>
    <div className="property-bottom"><span>{item.povrsina} m²{item.sobe ? ` · ${item.sobe} sobe` : ''}</span><strong>{formatCijena(item.cijena)} €{item.namjena === 'najam' ? ' / mj.' : ''}</strong></div>
    {item.primjer && <p className="demo-note">Primjer prikaza, nije stvarna ponuda</p>}
  </article>
}

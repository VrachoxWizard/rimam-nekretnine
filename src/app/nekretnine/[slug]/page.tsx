import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Gallery } from '@/components/Gallery'
import { PropertyCard } from '@/components/PropertyCard'
import { sveNekretnine } from '@/lib/nekretnine'
import { formatCijena, nazivVrste, origin } from '@/lib/property'

export async function generateStaticParams() { const items = await sveNekretnine(); return items.length ? items.map(({ slug }) => ({ slug })) : [{ slug: '__prazno__' }] }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const item = (await sveNekretnine()).find((i) => i.slug === slug)
  if (!item) return { title: 'Nekretnina nije pronađena' }
  return { title: item.naslov, description: `${nazivVrste[item.vrsta]} · ${item.lokacija} · ${item.povrsina} m². ${item.opis.slice(0, 120)}`, alternates: { canonical: `/nekretnine/${slug}/` }, openGraph: { images: [item.naslovna] }, robots: item.primjer ? { index: false, follow: true } : undefined }
}

export default async function Detalj({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const items = await sveNekretnine()
  const item = items.find((i) => i.slug === slug)
  if (!item) notFound()
  const related = items.filter((i) => i.slug !== slug && i.vrsta === item.vrsta).slice(0, 2)
  const images = [item.naslovna, ...(item.galerija || [])]
  const phone = item.kontakt_telefon || '098 250 447'
  const schema = !item.primjer ? { '@context': 'https://schema.org', '@type': 'RealEstateListing', name: item.naslov, description: item.opis, url: `${origin}/nekretnine/${slug}/`, image: images.map((image) => new URL(image, origin).toString()), offers: { '@type': 'Offer', price: item.cijena, priceCurrency: 'EUR' } } : null
  return <main id="sadrzaj"><div className="container detail-top"><Link className="back-link" href="/nekretnine/">← Sve nekretnine</Link><div className="detail-heading"><div><p className="eyebrow">{item.namjena === 'prodaja' ? 'Prodaja' : 'Najam'} · {nazivVrste[item.vrsta]}</p><h1>{item.naslov}</h1><p>{item.lokacija}</p></div><strong>{formatCijena(item.cijena)} €{item.namjena === 'najam' && <small> / mj.</small>}</strong></div>{item.primjer && <p className="demo-banner">Ovo je primjer prikaza oglasa, nije stvarna ponuda.</p>}</div><Gallery images={images} alt={item.naslov} /><div className="container detail-body"><article><div className="fact-row"><div><strong>{item.povrsina}</strong><span>m² površine</span></div>{item.sobe && <div><strong>{item.sobe}</strong><span>sobe</span></div>}<div><strong>{nazivVrste[item.vrsta]}</strong><span>vrsta nekretnine</span></div></div><h2>O nekretnini</h2><p className="description">{item.opis}</p>{item.karakteristike?.length ? <><h2>Karakteristike</h2><ul className="features">{item.karakteristike.map((x) => <li key={x}>{x}</li>)}</ul></> : null}<h2>Lokacija</h2><p>{item.adresa || item.lokacija}</p><p className="location-note">Točnu lokaciju i dodatne informacije možete zatražiti izravno od agencije.</p></article><aside className="inquiry"><p className="eyebrow">Zanima vas ova nekretnina?</p><h3>Dogovorimo razgovor.</h3><p>{item.kontakt_ime || 'RIMAM d.o.o.'}</p><Link className="button button-dark" href={`/kontakt/?nekretnina=${encodeURIComponent(slug)}`}>Pošaljite upit <span>↗</span></Link><a className="inquiry-phone" href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a></aside></div>{related.length > 0 && <section className="container section related"><div className="section-heading"><h2>Možda vas zanima</h2><Link href="/nekretnine/" className="text-link">Sve nekretnine ↗</Link></div><div className="property-grid">{related.map((i) => <PropertyCard key={i.slug} item={i} />)}</div></section>}<div className="detail-mobile-cta"><a href={`tel:${phone.replace(/\s/g, '')}`}>Nazovite</a><Link href={`/kontakt/?nekretnina=${encodeURIComponent(slug)}`}>Pošaljite upit ↗</Link></div>{schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />}</main>
}

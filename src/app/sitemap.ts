import type { MetadataRoute } from 'next'
import { sveNekretnine } from '@/lib/nekretnine'
import { origin } from '@/lib/property'

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ['', '/nekretnine/', '/o-nama/', '/usluge/', '/kontakt/', '/privatnost/']
  return [...pages.map((page) => ({ url: `${origin}${page}`, changeFrequency: 'monthly' as const, priority: page === '' ? 1 : 0.6 })), ...(await sveNekretnine()).filter((item) => !item.primjer).map((item) => ({ url: `${origin}/nekretnine/${item.slug}/`, changeFrequency: 'weekly' as const, priority: 0.8 }))]
}

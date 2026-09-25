import type { MetadataRoute } from 'next'
import { origin } from '@/lib/property'
export const dynamic = 'force-static'
export default function robots(): MetadataRoute.Robots { return process.env.VERCEL_ENV === 'preview' || process.env.SHOW_DEMO_LISTINGS === 'true' ? { rules: { userAgent: '*', disallow: '/' } } : { rules: { userAgent: '*', allow: '/' }, sitemap: `${origin}/sitemap.xml` } }

import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { origin } from '@/lib/property'
import '@fontsource/dm-sans/400.css'
import '@fontsource/dm-sans/500.css'
import '@fontsource/dm-sans/600.css'
import '@fontsource/cormorant-garamond/500.css'
import '@fontsource/cormorant-garamond/500-italic.css'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(origin),
  title: { default: 'RIMAM | Nekretnine Zagreb', template: '%s | RIMAM' },
  description: 'RIMAM d.o.o. agencija je za poslovanje nekretninama sa sjedištem u Zagrebu. Pronađite prostor za prave odluke.',
  alternates: { canonical: '/' },
  openGraph: { type: 'website', locale: 'hr_HR', siteName: 'RIMAM nekretnine', images: ['/images/hero.webp'] },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.svg' },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const business = { '@context': 'https://schema.org', '@type': 'RealEstateAgent', name: 'RIMAM d.o.o.', url: origin, telephone: '+38598250447', email: 'robert.ruzic67@gmail.com', address: { '@type': 'PostalAddress', streetAddress: 'Trnsko 1b', postalCode: '10000', addressLocality: 'Zagreb', addressCountry: 'HR' } }
  return <html lang="hr"><body><a className="skip-link" href="#sadrzaj">Preskoči na sadržaj</a><Header />{children}<Footer /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(business) }} /></body></html>
}


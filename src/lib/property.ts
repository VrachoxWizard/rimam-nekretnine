export type Nekretnina = {
  slug: string
  naslov: string
  objavljeno: boolean
  primjer?: boolean
  namjena: 'prodaja' | 'najam'
  vrsta: 'stan' | 'kuca' | 'zemljiste' | 'poslovni'
  lokacija: string
  adresa?: string
  cijena: number
  povrsina: number
  sobe?: number
  naslovna: string
  galerija?: string[]
  opis: string
  karakteristike?: string[]
  kontakt_ime?: string
  kontakt_telefon?: string
  kontakt_email?: string
}

export const formatCijena = (n: number) => new Intl.NumberFormat('hr-HR').format(n)
export const nazivVrste: Record<Nekretnina['vrsta'], string> = {
  stan: 'Stan', kuca: 'Kuća', zemljiste: 'Zemljište', poslovni: 'Poslovni prostor',
}

export const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://rimam.hr'

import fs from 'node:fs/promises'
import path from 'node:path'

if (process.env.HYGRAPH_ENDPOINT) {
  const query = `query Nekretnine { nekretninas(stage: PUBLISHED, first: 101) { slug naslov namjena vrsta lokacija adresa cijena povrsina sobe opis karakteristike kontaktIme kontaktTelefon kontaktEmail naslovna { url } galerija { url } } }`
  const response = await fetch(process.env.HYGRAPH_ENDPOINT, { method: 'POST', headers: { 'content-type': 'application/json', ...(process.env.HYGRAPH_TOKEN ? { authorization: `Bearer ${process.env.HYGRAPH_TOKEN}` } : {}) }, body: JSON.stringify({ query }) })
  if (!response.ok) throw new Error(`Hygraph: HTTP ${response.status}`)
  const data = await response.json()
  if (data.errors?.length || !Array.isArray(data.data?.nekretninas)) throw new Error(`Hygraph: ${data.errors?.map((error) => error.message).join('; ') || 'neispravan odgovor'}`)
  if (data.data.nekretninas.length > 100) throw new Error('Više od 100 oglasa: dodajte straničenje prije objave novih oglasa.')
  const items = data.data.nekretninas.map((item) => {
    if (!/^[a-z0-9-]{1,100}$/.test(item.slug || '') || !item.naslov || !item.lokacija || !item.opis || !/^https:\/\//.test(item.naslovna?.url || '') || !['prodaja', 'najam'].includes(item.namjena) || !['stan', 'kuca', 'zemljiste', 'poslovni'].includes(item.vrsta) || !Number.isFinite(item.cijena) || item.cijena < 0 || !Number.isFinite(item.povrsina) || item.povrsina <= 0) throw new Error(`Nepotpuni podaci za oglas ${item.slug || item.naslov || 'bez oznake'}`)
    return { slug: item.slug, naslov: item.naslov, namjena: item.namjena, vrsta: item.vrsta, lokacija: item.lokacija, adresa: item.adresa, cijena: item.cijena, povrsina: item.povrsina, sobe: item.sobe, opis: item.opis, karakteristike: item.karakteristike, kontakt_ime: item.kontaktIme, kontakt_telefon: item.kontaktTelefon, kontakt_email: item.kontaktEmail, naslovna: item.naslovna.url, galerija: item.galerija?.map((image) => image.url) || [], objavljeno: true }
  })
  const folder = path.join(process.cwd(), '.generated')
  await fs.mkdir(folder, { recursive: true })
  await fs.writeFile(path.join(folder, 'nekretnine.json'), JSON.stringify(items))
  console.log(`Hygraph: pripremljeno ${items.length} objavljenih oglasa.`)
}

import fs from 'node:fs'
import path from 'node:path'
import type { Nekretnina } from './property'

const folder = path.join(process.cwd(), 'content', 'nekretnine')

export function sveNekretnine(): Nekretnina[] {
  if (!fs.existsSync(folder)) return []
  return fs.readdirSync(folder)
    .filter((name) => name.endsWith('.json'))
    .map((name) => {
      const data = JSON.parse(fs.readFileSync(path.join(folder, name), 'utf8'))
      const image = (url: string) => {
        if (!/^\/uploads\/[a-zA-Z0-9/_.-]+$/.test(url) || url.split('/').includes('..')) return url
        const optimized = `${url.replace(/^\/uploads\//, '/optimized/')}.webp`
        return fs.existsSync(path.join(process.cwd(), 'public', optimized.slice(1))) ? optimized : url
      }
      if (data.naslovna) data.naslovna = image(data.naslovna)
      if (Array.isArray(data.galerija)) data.galerija = data.galerija.map(image)
      return { ...data, slug: name.slice(0, -5) } as Nekretnina
    })
    .filter((item) => item.objavljeno && item.naslov && item.naslovna)
}

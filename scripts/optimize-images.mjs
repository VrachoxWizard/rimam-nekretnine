import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const target = path.join(process.cwd(), 'public', 'optimized')
const supported = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif'])
const widths = [480, 960, 1600]

async function walk(directory, source) {
  const entries = await fs.readdir(directory, { withFileTypes: true })
  for (const entry of entries) {
    const full = path.join(directory, entry.name)
    if (entry.isDirectory()) { await walk(full, source); continue }
    if (!entry.isFile() || !supported.has(path.extname(entry.name).toLowerCase())) continue
    const relative = path.relative(source, full)
    for (const width of widths) {
      const destination = path.join(target, path.basename(source), `${relative}-${width}.webp`)
      await fs.mkdir(path.dirname(destination), { recursive: true })
      await sharp(full).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 80, effort: 5 }).toFile(destination)
    }
  }
}

for (const folder of ['uploads', 'images']) {
  const source = path.join(process.cwd(), 'public', folder)
  try { await walk(source, source) } catch (error) {
    if (error.code !== 'ENOENT') throw error
  }
}

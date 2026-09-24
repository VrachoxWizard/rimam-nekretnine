import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const source = path.join(process.cwd(), 'public', 'uploads')
const target = path.join(process.cwd(), 'public', 'optimized')
const supported = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif'])

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true })
  for (const entry of entries) {
    const full = path.join(directory, entry.name)
    if (entry.isDirectory()) { await walk(full); continue }
    if (!entry.isFile() || !supported.has(path.extname(entry.name).toLowerCase())) continue
    const relative = path.relative(source, full)
    const destination = path.join(target, `${relative}.webp`)
    await fs.mkdir(path.dirname(destination), { recursive: true })
    await sharp(full).rotate().resize({ width: 1920, withoutEnlargement: true }).webp({ quality: 82, effort: 5 }).toFile(destination)
  }
}

try { await walk(source) } catch (error) {
  if (error.code !== 'ENOENT') throw error
}

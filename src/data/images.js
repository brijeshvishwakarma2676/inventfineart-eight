// Image registry.
// Every image is looked up by its file name in src/assets/images, without the extension.
// To use real photography, drop e.g. `hero.jpg` or `hero.webp` into that folder:
// a photo always wins over the placeholder plate of the same name (avif > webp > jpg > png > svg).
import widths from '../assets/images/w/widths.json'

const files = import.meta.glob('../assets/images/*.{avif,webp,jpg,jpeg,png,svg}', {
  eager: true,
  import: 'default',
})

const rank = { avif: 5, webp: 4, jpg: 3, jpeg: 3, png: 2, svg: 1 }
const registry = {}

for (const [path, url] of Object.entries(files)) {
  const file = path.split('/').pop()
  const dot = file.lastIndexOf('.')
  const name = file.slice(0, dot)
  const ext = file.slice(dot + 1).toLowerCase()
  if (!registry[name] || rank[ext] > registry[name].rank) registry[name] = { url, rank: rank[ext] }
}

// Narrower copies made by scripts/photos.py (src/assets/images/w/<name>.<width>.webp) and each photo's full width.
// Img lists them in srcset, so a small card or a phone fetches and decodes a small file, not the full photo.
const copies = import.meta.glob('../assets/images/w/*.webp', { eager: true, import: 'default' })

const srcsets = {} // full URL -> "url 640w, url 1024w, ..., full 1800w"
const byName = {}
for (const [path, url] of Object.entries(copies)) {
  const [name, w] = path.split('/').pop().split('.')
  ;(byName[name] ||= []).push([Number(w), url])
}
for (const [name, entry] of Object.entries(registry)) {
  if (!widths[name] || !byName[name]) continue
  const list = [...byName[name].sort((a, b) => a[0] - b[0]), [widths[name], entry.url]]
  srcsets[entry.url] = list.map(([w, url]) => `${url} ${w}w`).join(', ')
}

/** The srcset for an image URL from img(), or undefined when it has no smaller copies. */
export const srcSetFor = (url) => srcsets[url]

export const img = (name) => {
  if (!registry[name]) {
    if (import.meta.env.DEV) console.warn(`[images] No image named "${name}" in src/assets/images`)
    return ''
  }
  return registry[name].url
}

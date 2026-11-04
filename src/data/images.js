// Image registry.
// Every image is looked up by its file name in src/assets/images, without the extension.
// To use real photography, drop e.g. `hero.jpg` or `hero.webp` into that folder:
// a photo always wins over the placeholder plate of the same name (avif > webp > jpg > png > svg).
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

export const img = (name) => {
  if (!registry[name]) {
    if (import.meta.env.DEV) console.warn(`[images] No image named "${name}" in src/assets/images`)
    return ''
  }
  return registry[name].url
}

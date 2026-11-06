// The Invent Fine Art cairn: four balanced stones, redrawn as a vector from the client's logo (only a 120px PNG exists).
// Keep these shapes in step with public/favicon.svg and the loader in index.html.
export const stones = [
  { cx: 16, cy: 27.2, rx: 13, ry: 3.4 },
  { cx: 15.4, cy: 20.1, rx: 9.6, ry: 2.9 },
  { cx: 16.4, cy: 13.9, rx: 6.6, ry: 2.5 },
  { cx: 15.8, cy: 8.3, rx: 3.6, ry: 2.3 },
]

export default function LogoMark({ className = '', topClassName = '' }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      {stones.map((s, i) => (
        <ellipse key={i} {...s} fill="currentColor" className={i === stones.length - 1 ? topClassName : undefined} />
      ))}
    </svg>
  )
}

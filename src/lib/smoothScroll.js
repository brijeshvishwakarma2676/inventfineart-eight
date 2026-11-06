import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

// Weighted, eased scrolling for mouse wheels and trackpads. Touch keeps the phone's own scrolling,
// and visitors who ask for less motion keep the browser's default.
const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const lenis = reduce
  ? null
  : new Lenis({
      lerp: 0.085,
      wheelMultiplier: 0.95,
      autoRaf: true,
    })

// Anything that freezes the page (the opening loader, the mobile menu) holds a lock; scrolling resumes when none remain.
const locks = new Set()
export function lockScroll(key, locked) {
  if (locked) locks.add(key)
  else locks.delete(key)
  if (!lenis) return
  if (locks.size) lenis.stop()
  else lenis.start()
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
  else window.scrollTo(0, 0)
}

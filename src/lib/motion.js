// Shared motion language: one easing curve, a few durations.
export const ease = [0.22, 1, 0.36, 1]
export const easeIn = [0.65, 0, 0.35, 1]

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
}

export const stagger = (delay = 0.08, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: delay, delayChildren } },
})

export const viewport = { once: true, margin: '0px 0px -12% 0px' }

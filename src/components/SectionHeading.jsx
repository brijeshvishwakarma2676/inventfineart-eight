import { motion } from 'motion/react'
import RevealText from './RevealText'
import { fadeUp, viewport } from '../lib/motion'

/**
 * Section title with an optional short context line and intro paragraph.
 * `size` picks the type step; the title words rise into view once.
 */
export default function SectionHeading({ context, title, intro, size = 'h2', as = 'h2', className = '', tone = 'dark', align = 'left' }) {
  const muted = tone === 'light' ? 'text-limestone/70' : 'text-ash'
  return (
    <div className={`${align === 'center' ? 'mx-auto text-center' : ''} ${className}`}>
      {context && (
        <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport} className={`t-label mb-5 ${tone === 'light' ? 'text-brass' : 'text-bronze'}`}>
          {context}
        </motion.p>
      )}
      <RevealText as={as} text={title} className={`t-${size}`} />
      {intro && (
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className={`t-lead mt-6 max-w-[38rem] ${muted} ${align === 'center' ? 'mx-auto' : ''}`}
        >
          {intro}
        </motion.p>
      )}
    </div>
  )
}

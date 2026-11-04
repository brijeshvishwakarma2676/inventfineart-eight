import { motion, useReducedMotion } from 'motion/react'
import { ease, viewport } from '../lib/motion'

/**
 * Heading whose words rise out of a mask, once, as it enters view.
 * Screen readers get the plain text; the animated words are hidden from them.
 */
export default function RevealText({ text, as = 'h2', className = '', delay = 0, animateOnMount = false }) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  const lines = Array.isArray(text) ? text : [text]
  let index = 0

  const trigger = animateOnMount ? { animate: 'show' } : { whileInView: 'show', viewport }

  return (
    <Tag className={className} aria-label={lines.join(' ')} initial={reduce ? 'show' : 'hidden'} {...trigger}>
      {lines.map((line, li) => (
        <span key={li} className="block" aria-hidden="true">
          {line.split(' ').map((word, wi) => {
            const i = index++
            return (
              <span key={wi} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom">
                <motion.span
                  className="inline-block"
                  variants={{
                    hidden: { y: '110%' },
                    show: { y: '0%', transition: { duration: 1.05, ease, delay: delay + i * 0.055 } },
                  }}
                >
                  {word}
                  {wi < line.split(' ').length - 1 ? '\u00a0' : ''}
                </motion.span>
              </span>
            )
          })}
        </span>
      ))}
    </Tag>
  )
}

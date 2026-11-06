import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useReducedMotion } from 'motion/react'
import { site } from '../../data/site'
import { ease, stagger, fadeUp } from '../../lib/motion'

// Only facts we hold: founding year (owner), the four services, the client's photographed portfolio
// (over 100 distinct pieces in site-v4 designs.js and the gallery), and the factory running round the clock (owner).
const facts = [
  { value: new Date().getFullYear() - site.founded, label: `years of making, since ${site.founded}` },
  { value: 100, suffix: '+', label: 'pieces in our portfolio' },
  { value: 4, label: 'services, from sculpture to GRC façades' },
  { text: '24×7', label: 'our own factory, round the clock' },
]

function Count({ value, suffix = '', text }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const reduce = useReducedMotion()
  const [shown, setShown] = useState(reduce || text ? value : 0)

  useEffect(() => {
    if (!inView || reduce || text) return
    const controls = animate(0, value, { duration: 1.8, ease, onUpdate: (v) => setShown(Math.round(v)) })
    return () => controls.stop()
  }, [inView, reduce, text, value])

  return (
    <span ref={ref} className="tabular-nums">
      {text ?? shown}
      {suffix && <span className="text-bronze">{suffix}</span>}
    </span>
  )
}

/** A quiet row of figures between the studio introduction and the collections. */
export default function Numbers() {
  return (
    <section className="shell pb-24 md:pb-36" aria-label="Invent Fine Art in numbers">
      <motion.dl
        className="grid grid-cols-2 border-t border-graphite/15 md:grid-cols-4"
        variants={stagger(0.12)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      >
        {facts.map((f, i) => (
          <motion.div
            key={f.label}
            variants={fadeUp}
            className={`flex flex-col-reverse justify-end gap-3 border-b border-graphite/15 py-8 pr-4 md:border-b-0 md:py-12 ${
              i % 2 === 1 ? 'border-l border-graphite/15 pl-5' : ''
            } ${i > 0 ? 'md:border-l md:border-graphite/15 md:pl-8' : ''}`}
          >
            <dt className="max-w-[14rem] text-[0.95rem] leading-snug text-ash">{f.label}</dt>
            <dd className="font-display text-[clamp(3rem,5.4vw,5.5rem)] leading-none tracking-[-0.02em]">
              <Count value={f.value} suffix={f.suffix} text={f.text} />
            </dd>
          </motion.div>
        ))}
      </motion.dl>
    </section>
  )
}

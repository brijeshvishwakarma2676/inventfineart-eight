import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import SectionHeading from '../SectionHeading'
import ImageReveal from '../ImageReveal'
import { img } from '../../data/images'
import { ease } from '../../lib/motion'

// How we work, in the client's own words (old site about-us.html and the 2026-10-24 brief; site-v4 content.js).
const steps = [
  { title: 'Concept', time: 'Your idea', text: 'Share your idea: a sketch, a reference photo or a drawing, with the size and the site.' },
  { title: 'Design', time: 'A miniature first', text: 'Our artisans and product designers develop the piece as per your design and requirement, with a 3D-printed miniature for your approval.' },
  { title: 'Manufacture', time: 'Our own factory', text: 'Made in our manufacturing unit, which runs round the clock, with the latest tools, technology and machinery.' },
  { title: 'Quality check', time: 'Before it leaves', text: 'Each piece is examined on numerous factors by our quality control unit before delivery.' },
  { title: 'Packing and fixing', time: 'On site', text: 'Delivered in premium quality packing, and fixed on site where required.' },
]

export default function Process() {
  const listRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 70%', 'end 60%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <section className="py-24 md:py-40" aria-label="Creative process">
      <div className="shell grid gap-16 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-32">
            <SectionHeading
              title="From sketch to site"
              intro="Five stages, one team, from the first concept to the complete execution."
            />
            <ImageReveal src={img('ifa-eagle-drawing')} alt="Ink concept drawing of an eagle, a sword and an anchor on a rock base" className="mt-12 hidden aspect-[16/11] md:block" imgClassName="object-[50%_40%]" />
            <p className="t-label mt-3 hidden text-ash md:block">Concept drawing for a landmark, before it was made.</p>
          </div>
        </div>

        <div ref={listRef} className="relative md:col-span-6 md:col-start-7">
          <span className="absolute bottom-0 left-[1.15rem] top-0 w-px bg-graphite/15 md:left-[1.4rem]" aria-hidden="true" />
          <motion.span
            className="absolute bottom-0 left-[1.15rem] top-0 w-px origin-top bg-bronze md:left-[1.4rem]"
            style={{ scaleY: progress }}
            aria-hidden="true"
          />
          <ol className="space-y-16 md:space-y-24">
            {steps.map((s, i) => (
              <motion.li
                key={s.title}
                className="relative grid grid-cols-[2.4rem_1fr] gap-6 md:grid-cols-[3rem_1fr] md:gap-10"
                initial={{ opacity: 0.35 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '0px 0px -30% 0px' }}
                transition={{ duration: 0.6, ease }}
              >
                <span className="relative z-10 flex size-[2.4rem] items-center justify-center bg-limestone font-display text-[1.35rem] text-bronze md:size-12 md:text-[1.6rem]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="t-label text-ash">{s.time}</p>
                  <h3 className="t-h3 mt-1">{s.title}</h3>
                  <p className="mt-4 max-w-[34rem] leading-[1.75] text-ash">{s.text}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

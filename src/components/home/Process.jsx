import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import SectionHeading from '../SectionHeading'
import ImageReveal from '../ImageReveal'
import { img } from '../../data/images'
import { ease } from '../../lib/motion'

const steps = [
  { title: 'Concept', time: 'Week 1', text: 'We visit the site, study the drawings and talk through how the space is used. You receive sketches and two or three directions, each with an honest budget.' },
  { title: 'Design', time: 'Weeks 2 to 4', text: 'The chosen direction is developed as a 3D model and shop drawings, with material samples and finishes matched to your site. Nothing is cast until you sign these off.' },
  { title: 'Development', time: 'Weeks 4 to 6', text: 'Our sculptors shape the full-size pattern in clay or CNC-cut foam, and our mould-makers build the moulds that every piece will be cast from.' },
  { title: 'Fabrication', time: 'Weeks 6 to 12', text: 'Pieces are cast in GRC or laminated in FRP, cured, then finished by hand. You are welcome in the workshop at any point to see work in progress.' },
  { title: 'Installation', time: 'On site', text: 'The team that made the work installs it, with our own fixings, lifting gear and supervision. We hand over care notes and stay on call afterwards.' },
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
              intro="Five stages, one team. A typical commission takes ten to sixteen weeks from first visit to installation."
            />
            <ImageReveal src={img('st-sketch')} alt="Concept drawing of an arch with a circular void" className="mt-12 hidden aspect-[16/10] md:block" />
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

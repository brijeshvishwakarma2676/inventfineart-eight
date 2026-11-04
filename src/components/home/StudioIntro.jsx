import { motion } from 'motion/react'
import ImageReveal from '../ImageReveal'
import Button from '../Button'
import { img } from '../../data/images'
import { site } from '../../data/site'
import { fadeUp, viewport } from '../../lib/motion'

export default function StudioIntro() {
  return (
    <section className="pb-20 pt-24 md:pb-28 md:pt-40" aria-labelledby="studio-intro">
      <div className="shell">
        <div className="grid gap-8 md:grid-cols-12">
          <p className="t-label text-bronze md:col-span-2 md:pt-3">The studio</p>
          <motion.h2
            id="studio-intro"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="t-statement md:col-span-9"
          >
            Since {site.founded}, a community of artists bringing outstanding art to the commercial world, from our own
            factory near Mumbai.
          </motion.h2>
        </div>

        <div className="mt-20 grid gap-14 md:mt-28 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <ImageReveal src={img('ifa-seated-figure')} alt="A seated figure sculpture with a deep bronze finish" arch parallax className="aspect-[3/4]" />
          </div>

          <div className="flex flex-col md:col-span-6 md:col-start-7">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport} className="max-w-[34rem] space-y-5 text-[1.0625rem] leading-[1.75] text-ash md:pt-24">
              <p>
                We are a team of sculptors, painters and designers, working in all areas of interior and architectural design,
                at indoor as well as outdoor sites.
              </p>
              <p>
                Every piece is made to your design and requirement. We 3D-print a miniature for your approval, make the full
                piece in our own factory, check it, pack it with care and fix it on site.
              </p>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport} className="mt-10">
              <Button to="/about" variant="outline">Read the studio story</Button>
            </motion.div>

            <div className="mt-16 w-3/4 self-end md:mt-auto md:w-[62%]">
              <ImageReveal src={img('st-texture')} alt="Fluted GRC surface under raking light" className="aspect-square" delay={0.15} />
              <p className="t-label mt-3 text-ash">Fluted GRC, sanded and sealed by hand.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

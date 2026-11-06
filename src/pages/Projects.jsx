import { motion } from 'motion/react'
import PageTransition from '../components/PageTransition'
import RevealText from '../components/RevealText'
import ProjectCard from '../components/ProjectCard'
import CustomCTA from '../components/CustomCTA'
import usePageMeta from '../hooks/usePageMeta'
import { projects } from '../data/projects'
import { ease } from '../lib/motion'

// Alternating compositions so each project gets its own wall.
const placements = [
  { className: 'md:col-span-12', aspect: 'aspect-[4/5] md:aspect-[21/9]', layout: 'split', titleSize: 'h2' },
  { className: 'md:col-span-5', aspect: 'aspect-[3/4]' },
  { className: 'md:col-span-6 md:col-start-7 md:mt-48', aspect: 'aspect-[4/3]' },
  { className: 'md:col-span-8 md:col-start-3', aspect: 'aspect-[4/3] md:aspect-[16/9]' },
  { className: 'md:col-span-6', aspect: 'aspect-[4/3]' },
  { className: 'md:col-span-5 md:col-start-8 md:mt-32', aspect: 'aspect-[4/3]' },
]

export default function Projects() {
  usePageMeta('Projects', 'Executed work by Invent Fine Art: landmarks and statues, water features, murals, GRC façades, interiors, pergolas and gazebos.')
  return (
    <PageTransition>
      <section className="shell pb-16 pt-32 md:pb-24 md:pt-44">
        <div className="grid gap-8 md:grid-cols-12">
          <RevealText as="h1" text={['Projects']} className="t-h1 md:col-span-7" animateOnMount delay={0.15} />
          <motion.p
            className="t-lead text-ash md:col-span-4 md:col-start-9 md:self-end"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.45 }}
          >
            Work we have designed, made in our own factory and fixed on site, grouped by kind.
          </motion.p>
        </div>
      </section>

      <section className="shell pb-24 md:pb-40" aria-label="All projects">
        <div className="grid gap-24 md:grid-cols-12 md:gap-x-8 md:gap-y-36">
          {projects.map((p, i) => {
            const place = placements[i % placements.length]
            return (
              <ProjectCard
                key={p.slug}
                project={p}
                aspect={place.aspect}
                layout={place.layout}
                titleSize={place.titleSize}
                className={place.className}
                priority={i === 0}
              />
            )
          })}
        </div>
      </section>

      <CustomCTA />
    </PageTransition>
  )
}

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import ImageReveal from './ImageReveal'
import { img } from '../data/images'
import { fadeUp, viewport } from '../lib/motion'

/**
 * Editorial project card. On devices with a fine pointer, a small "View project" disc
 * follows the cursor across the image so the whole picture reads as the link.
 */
export default function ProjectCard({ project, aspect = 'aspect-[4/5]', layout = 'stacked', className = '', titleSize = 'h3', priority = false }) {
  const reduce = useReducedMotion()
  const [hovering, setHovering] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 })

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - r.left)
    y.set(e.clientY - r.top)
  }

  // Client, place and year appear once the client allows naming them; until then, how many photographs the project holds.
  const meta = [project.client, project.location, project.year].filter(Boolean).join(', ') || `${project.gallery.length + 1} photographs`

  return (
    <article className={className}>
      <Link to={`/projects/${project.slug}`} className="group block" aria-label={`${project.title}: view project`}>
        <div
          className="relative"
          onPointerEnter={(e) => e.pointerType === 'mouse' && setHovering(true)}
          onPointerLeave={() => setHovering(false)}
          onPointerMove={onMove}
        >
          <ImageReveal src={img(project.hero)} alt={project.title} className={aspect} imgClassName={project.heroFocus} hover priority={priority} />
          {!reduce && (
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 z-10 hidden size-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-limestone text-center t-label text-graphite md:flex"
              style={{ x: sx, y: sy }}
              initial={false}
              animate={{ scale: hovering ? 1 : 0, opacity: hovering ? 1 : 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              View project
            </motion.span>
          )}
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className={layout === 'split' ? 'mt-6 grid gap-4 md:grid-cols-12 md:gap-8' : 'mt-5'}
        >
          <div className={layout === 'split' ? 'md:col-span-5' : ''}>
            <p className="t-label text-bronze">{project.discipline}</p>
            <h3 className={`t-${titleSize} mt-2 transition-colors duration-500 group-hover:text-bronze`}>{project.title}</h3>
          </div>
          <div className={layout === 'split' ? 'md:col-span-6 md:col-start-7 md:pt-7' : 'mt-3'}>
            <p className="max-w-[36rem] leading-relaxed text-ash">{project.summary}</p>
            <p className="t-label mt-3 text-graphite/80">{meta}</p>
          </div>
        </motion.div>
      </Link>
    </article>
  )
}

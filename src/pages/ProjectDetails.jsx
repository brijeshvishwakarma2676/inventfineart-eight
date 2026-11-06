import { useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import PageTransition from '../components/PageTransition'
import RevealText from '../components/RevealText'
import ImageReveal from '../components/ImageReveal'
import ProjectCard from '../components/ProjectCard'
import CustomCTA from '../components/CustomCTA'
import Img from '../components/Img'
import NotFound from './NotFound'
import usePageMeta from '../hooks/usePageMeta'
import { projectBySlug, projects } from '../data/projects'
import { img } from '../data/images'
import { categoryBySlug } from '../data/categories'
import { ease, fadeUp, viewport } from '../lib/motion'

const shapes = {
  tall: { aspect: 'aspect-[3/4]', col: 'md:col-span-5' },
  wide: { aspect: 'aspect-[16/10]', col: 'md:col-span-7' },
  square: { aspect: 'aspect-square', col: 'md:col-span-5' },
}

export default function ProjectDetails() {
  const { slug } = useParams()
  const project = projectBySlug[slug]
  usePageMeta(project?.title, project?.summary)
  const heroRef = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  if (!project) return <NotFound />

  const index = projects.findIndex((p) => p.slug === slug)
  const next = projects[(index + 1) % projects.length]
  const related = projects
    .filter((p) => p.slug !== slug && p.slug !== next.slug && p.categories.some((c) => project.categories.includes(c)))
    .concat(projects.filter((p) => p.slug !== slug && p.slug !== next.slug))
    .filter((p, i, arr) => arr.findIndex((q) => q.slug === p.slug) === i)
    .slice(0, 2)

  const meta = [
    ['Client', project.client],
    ['Location', project.location],
    ['Year', project.year],
    ['Scale', project.scale],
    ['Discipline', project.discipline],
    ['Services', project.categories.map((c) => categoryBySlug[c]?.name).filter(Boolean).join(', ')],
    ['Photographs', project.gallery.length + 1],
  ].filter(([, v]) => v)

  return (
    <PageTransition>
      {/* Hero */}
      <section ref={heroRef} className="relative h-[88svh] min-h-[32rem] overflow-hidden bg-basalt">
        <motion.div
          className="absolute inset-0"
          style={reduce ? undefined : { y: heroY, scale: heroScale }}
          initial={reduce ? false : { clipPath: 'inset(8% 6% 8% 6%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 1.5, ease }}
        >
          <img src={img(project.hero)} alt={project.title} fetchPriority="high" className="h-full w-full object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-graphite/75 via-graphite/15 to-transparent" aria-hidden="true" />
        <div className="shell relative flex h-full flex-col justify-end pb-12 text-limestone md:pb-16">
          <motion.p className="t-label text-limestone/80" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.8 }}>
            <Link to="/projects" className="link-line">Projects</Link>
            <span aria-hidden="true" className="mx-2">/</span>
            {project.discipline}
          </motion.p>
          <RevealText as="h1" text={project.title} className="t-h1 mt-4 max-w-[16ch]" animateOnMount delay={0.45} />
        </div>
      </section>

      {/* Facts */}
      <section className="border-b border-graphite/10">
        <dl className="shell grid grid-cols-2 gap-y-6 py-10 md:flex md:gap-x-20 md:py-12">
          {meta.map(([k, v]) => (
            <div key={k} className="pr-4">
              <dt className="t-label text-ash">{k}</dt>
              <dd className="mt-1.5 font-display text-[1.2rem] leading-snug">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Overview */}
      <section className="shell grid gap-8 py-24 md:grid-cols-12 md:py-36">
        <h2 className="t-label text-bronze md:col-span-2 md:pt-3">Overview</h2>
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport} className="md:col-span-8">
          <p className="t-statement">{project.summary}</p>
          <p className="mt-10 max-w-[40rem] text-[1.0625rem] leading-[1.8] text-ash md:ml-[25%]">{project.overview}</p>
        </motion.div>
      </section>

      {/* Gallery */}
      <section className="shell pb-24 md:pb-36" aria-label="Project gallery">
        <div className="grid gap-12 md:grid-cols-12 md:gap-x-8 md:gap-y-24">
          {project.gallery.map((g, i) => {
            const s = shapes[g.shape] || shapes.wide
            const place = i % 2 === 1 ? 'md:col-span-5 md:col-start-8 md:mt-32' : s.col
            return (
              <figure key={g.image + i} className={place}>
                <ImageReveal src={img(g.image)} alt={g.alt} parallax={i === 0} className={s.aspect} />
                <figcaption className="t-label mt-3 text-ash">{g.caption}</figcaption>
              </figure>
            )
          })}
        </div>
      </section>

      {/* Concept and materials, when the project has them */}
      {(project.concept || project.materials?.length > 0) && (
      <section className="on-dark bg-basalt py-24 text-limestone md:py-36">
        <div className="shell grid gap-16 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <h2 className="t-label text-brass">Design concept</h2>
            <motion.blockquote variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport} className="t-statement mt-6">
              {project.concept}
            </motion.blockquote>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <h2 className="t-label text-brass">Materials used</h2>
            <ul className="mt-6">
              {project.materials?.map((m) => (
                <li key={m.name} className="border-t border-brass/30 py-5">
                  <span className="font-display text-[1.3rem]">{m.name}</span>
                  <span className="mt-1 block text-[0.95rem] text-limestone/65">{m.note}</span>
                </li>
              ))}
            </ul>
            {project.specs?.length > 0 && (
              <>
                <h2 className="t-label mt-14 text-brass">Specifications</h2>
                <dl className="mt-6">
                  {project.specs.map(([k, v]) => (
                    <div key={k} className="grid grid-cols-[9rem_1fr] gap-4 border-t border-brass/30 py-3.5 text-[0.95rem]">
                      <dt className="text-limestone/60">{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
              </>
            )}
          </div>
        </div>
      </section>
      )}

      {/* Next project */}
      <Link to={`/projects/${next.slug}`} className="group relative block h-[70svh] min-h-[26rem] overflow-hidden bg-basalt" aria-label={`Next project: ${next.title}`}>
        <Img src={img(next.hero)} alt="" className="absolute inset-0 h-full w-full object-cover opacity-80 transition-[transform,opacity] duration-[1.4s] ease-[var(--ease-sculpt)] group-hover:scale-[1.04] group-hover:opacity-100" />
        <div className="absolute inset-0 bg-graphite/45 transition-colors duration-700 group-hover:bg-graphite/30" aria-hidden="true" />
        <div className="shell relative flex h-full flex-col justify-center text-limestone">
          <p className="t-label text-limestone/80">Next project</p>
          <p className="t-h1 mt-4 max-w-[16ch] transition-transform duration-700 ease-[var(--ease-sculpt)] group-hover:translate-x-3">{next.title}</p>
          <p className="mt-4 text-limestone/80">{[next.location, next.year].filter(Boolean).join(', ') || next.discipline}</p>
        </div>
      </Link>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-24 md:py-36" aria-label="Related projects">
          <div className="shell">
            <h2 className="t-h2">Related projects</h2>
            <div className="mt-14 grid gap-20 md:grid-cols-12 md:gap-8">
              {related.map((p, i) => (
                <ProjectCard key={p.slug} project={p} aspect={i === 0 ? 'aspect-[4/3]' : 'aspect-[3/4]'} className={i === 0 ? 'md:col-span-7' : 'md:col-span-4 md:col-start-9 md:mt-24'} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CustomCTA
        title={['Planning something', 'like this?']}
        text={`Tell us about your site and timeline. If ${project.title} is close to what you have in mind, mention it and we will start from there.`}
        whatsappText={`Hello, I saw ${project.title} on your website and would like to discuss a similar project.`}
        image={project.gallery[0]?.image || project.hero}
      />
    </PageTransition>
  )
}

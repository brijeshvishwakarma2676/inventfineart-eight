import { motion } from 'motion/react'
import PageTransition from '../components/PageTransition'
import RevealText from '../components/RevealText'
import SectionHeading from '../components/SectionHeading'
import ImageReveal from '../components/ImageReveal'
import CustomCTA from '../components/CustomCTA'
import Img from '../components/Img'
import usePageMeta from '../hooks/usePageMeta'
import { img } from '../data/images'
import { site } from '../data/site'
import { ease, fadeUp, stagger, viewport } from '../lib/motion'

const principles = [
  {
    title: 'Made for one place',
    text: 'We design for a particular wall, courtyard or facade, and the light and people it will meet. A piece that would suit anywhere usually belongs nowhere.',
  },
  {
    title: 'The hand stays visible',
    text: 'Moulds let us repeat a form, but every surface is finished by a person. Slight differences between pieces are the point, not a flaw to hide.',
  },
  {
    title: 'Built to outlast the trend',
    text: 'We choose materials, fixings and finishes for the next thirty monsoons, not the next launch. Calm forms age better than clever ones.',
  },
]

// The four units of the facility (client's old site, about-us page).
const journey = [
  { year: '01', title: 'Manufacturing unit', text: 'Equipped with the latest tools, technology and machinery.' },
  { year: '02', title: 'Quality control unit', text: 'Every product is examined on numerous factors before it is delivered.' },
  { year: '03', title: 'Research and development unit', text: 'Works in close co-operation with the other units, as part of the same facility.' },
  { year: '04', title: 'Warehousing and packaging unit', text: 'Products leave in premium quality packing and reach your premises as they left us.' },
]

// How we work (client's old site and the 2026-10-24 brief).
const capabilities = [
  ['Concept', 'Share your idea: a sketch, a reference photo or a drawing, with the size and the site.'],
  ['Design', 'Our artisans and product designers develop the piece to your design, with a 3D-printed miniature for your approval.'],
  ['Manufacture', 'Made in our own manufacturing unit, which runs round the clock, with the latest tools and machinery.'],
  ['Quality check', 'Each piece is examined on numerous factors by our quality control unit before delivery.'],
  ['Packing and fixing', 'Delivered in premium quality packing, and fixed on site where required.'],
  ['Turnkey projects', 'For residential, commercial and large-scale projects, indoors and outdoors, from concept to execution.'],
]

const techniques = [
  { name: 'GRC', image: 'ifa-grc-facade', text: 'Screens, facade panels, columns and relief.', className: 'col-span-2 md:col-span-5', aspect: 'aspect-[4/5]' },
  { name: 'FRP', image: 'ifa-wave-sculpture', text: 'Seamless, light forms that span.', className: 'md:col-span-3 md:mt-40', aspect: 'aspect-[3/4]' },
  { name: 'Bronze', image: 'ifa-bronze-birds', text: 'For sculpture, indoors and out.', className: 'md:col-span-4 md:mt-16', aspect: 'aspect-square' },
  { name: 'Murals and wall features', image: 'ifa-leaf-lights', text: 'Relief, metal and lit pieces made for one wall.', className: 'col-span-2 md:col-span-6 md:col-start-4 md:-mt-8', aspect: 'aspect-[16/10]' },
]

// Work in progress, from the client's own photographs.
const behindTheScenes = [
  { image: 'ifa-clay-portrait', caption: 'A portrait statue, still in clay.', aspect: 'aspect-[3/4]' },
  { image: 'ifa-machine-lion-workshop', caption: 'The lion of machine parts, in the workshop.', aspect: 'aspect-[3/4]' },
  { image: 'ifa-rockery-build', caption: 'A rock wall taking shape on site.', aspect: 'aspect-[16/10]' },
  { image: 'ifa-dancers-workshop', caption: 'Two dancers, before finishing.', aspect: 'aspect-[3/4]' },
  { image: 'ifa-heritage-facade', caption: 'A heritage-style façade, during installation.', aspect: 'aspect-[4/3]' },
  { image: 'ifa-facade-install', caption: 'Cladding panels being fixed.', aspect: 'aspect-[3/5]' },
]

export default function About() {
  usePageMeta(
    'Studio',
    `${site.name} is a community of sculptors, painters and designers making sculptures, planters, murals and FRP and GRC products since ${site.founded}.`
  )

  return (
    <PageTransition>
      {/* Introduction */}
      <section className="shell grid gap-12 pb-20 pt-32 md:grid-cols-12 md:gap-8 md:pb-32 md:pt-44">
        <div className="md:col-span-6 md:pt-10">
          <p className="t-label mb-6 text-bronze">The studio</p>
          <RevealText as="h1" text={['A community of artists,', 'one facility.']} className="t-h1" animateOnMount delay={0.2} />
          <motion.p
            className="t-lead mt-8 max-w-[34rem] text-ash"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.7 }}
          >
            {site.name} is a team of sculptors, painters and designers, working in all areas of interior and architectural
            design, at indoor as well as outdoor sites. Our own facility handles every stage, from the first concept to fixing on site.
          </motion.p>
        </div>
        <div className="md:col-span-5 md:col-start-8">
          <ImageReveal src={img('ifa-seated-figure')} alt="A seated figure sculpture with a deep bronze finish" arch priority className="aspect-[3/4]" />
        </div>
      </section>

      <ImageReveal src={img('ifa-machine-lion')} alt="A lion made of machine parts, in the Invent Fine Art workshop" parallax className="aspect-[4/3] w-full md:aspect-[21/8]" imgClassName="object-[50%_60%]" />

      {/* Philosophy */}
      <section className="py-24 md:py-40">
        <div className="shell">
          <SectionHeading
            title="What we believe"
            intro="Three ideas guide every decision in the workshop, from the first drawing to the last coat of sealer."
          />
          <motion.div
            className="mt-16 grid gap-14 md:mt-24 md:grid-cols-12 md:gap-8"
            variants={stagger(0.15)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            {principles.map((p, i) => (
              <motion.div
                key={p.title}
                variants={fadeUp}
                className={`border-t border-graphite/20 pt-8 md:col-span-4 ${['', 'md:mt-20', 'md:mt-40'][i]}`}
              >
                <h3 className="t-h3">{p.title}</h3>
                <p className="mt-4 max-w-[30rem] leading-[1.75] text-ash">{p.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Journey */}
      <section className="bg-plaster py-24 md:py-36" aria-label="Our facility">
        <div className="shell grid gap-14 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <div className="md:sticky md:top-32">
              <SectionHeading title="Our facility" intro="Four units working together as one facility, so every piece is made, checked and packed by us." />
              <ImageReveal src={img('ifa-spinning-wheel')} alt="A figure at the spinning wheel, finished in banded metal tones" className="mt-12 hidden aspect-[3/4] w-[78%] md:block" delay={0.1} />
              <p className="t-label mt-3 hidden text-ash md:block">Figure at the spinning wheel, made in our factory.</p>
            </div>
          </div>
          <ol className="md:col-span-7 md:col-start-6">
            {journey.map((j) => (
              <motion.li
                key={j.year}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                className="grid gap-3 border-t border-graphite/15 py-10 sm:grid-cols-[9rem_1fr] sm:gap-8"
              >
                <span className="font-display text-[2.5rem] leading-none text-bronze">{j.year}</span>
                <div>
                  <h3 className="t-h3">{j.title}</h3>
                  <p className="mt-3 max-w-[34rem] leading-[1.75] text-ash">{j.text}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Craftsmanship and capabilities */}
      <section className="py-24 md:py-40" aria-label="Craftsmanship and capabilities">
        <div className="shell grid gap-16 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <ImageReveal src={img('ifa-stone-ganesha')} alt="A stylised Ganesha carved in pale stone, on a marble plinth" arch parallax className="aspect-[3/4]" />
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <SectionHeading
              title="How we work"
              intro="Start-to-end solutions, from the first concept to the complete execution, with one team."
            />
            <dl className="mt-12 grid gap-x-8 sm:grid-cols-2">
              {capabilities.map(([k, v]) => (
                <motion.div key={k} variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport} className="border-t border-graphite/15 py-6">
                  <dt className="font-display text-[1.3rem]">{k}</dt>
                  <dd className="mt-2 text-[0.975rem] leading-relaxed text-ash">{v}</dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Materials and techniques */}
      <section className="on-dark bg-basalt py-24 text-limestone md:py-36" aria-label="Materials and techniques">
        <div className="shell">
          <SectionHeading
            tone="light"
            title="Materials and techniques"
            intro="We choose the material for the job, then finish it until it feels inevitable."
          />
          <div className="mt-16 grid grid-cols-2 gap-x-4 gap-y-12 md:mt-24 md:grid-cols-12 md:gap-x-8">
            {techniques.map((t) => (
              <figure key={t.name} className={t.className}>
                <ImageReveal src={img(t.image)} alt={t.name} className={t.aspect} />
                <figcaption className="mt-4">
                  <span className="font-display text-[1.4rem]">{t.name}</span>
                  <span className="mt-1 block text-[0.95rem] text-limestone/65">{t.text}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Behind the scenes */}
      <section className="py-24 md:py-36" aria-label="Behind the scenes">
        <div className="shell flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading title="Behind the scenes" intro="Work in progress, in the workshop and on site." />
          <p className="t-label text-ash">Scroll sideways to see more</p>
        </div>
        <div className="mt-14 overflow-x-auto overscroll-x-contain pb-6 [scrollbar-width:thin]" tabIndex={0} aria-label="Workshop photographs">
          <ul className="flex w-max snap-x snap-mandatory items-end gap-4 px-[clamp(1.25rem,4vw,3.5rem)] md:gap-8">
            {behindTheScenes.map((b) => (
              <li key={b.image} className="snap-start">
                <figure>
                  <div className={`relative h-[52svh] max-h-[34rem] min-h-[18rem] overflow-hidden bg-plaster ${b.aspect}`}>
                    <Img src={img(b.image)} alt={b.caption} className="h-full w-full object-cover" />
                  </div>
                  <figcaption className="t-label mt-3 text-ash">{b.caption}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CustomCTA
        title={['Bring us a drawing,', 'a photograph or', 'just the address.']}
        text="Every project starts with a conversation and, wherever possible, a visit to the site. Tell us what you have in mind and we will tell you how we would make it."
        image="ifa-kite-flyer"
      />
    </PageTransition>
  )
}

import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import SectionHeading from '../SectionHeading'
import Img from '../Img'
import { img } from '../../data/images'
import { ease } from '../../lib/motion'

const materials = [
  {
    id: 'grc',
    tab: 'GRC',
    name: 'Glass-reinforced concrete',
    image: 'ifa-grc-facade',
    alt: 'A white GRC facade wall of three-dimensional diamond panels',
    text:
      'A fine concrete reinforced with alkali-resistant glass fibre, sprayed or poured into our moulds in layers as thin as 12 mm. It carries the weight, texture and permanence of stone at roughly a quarter of the load, which makes large screens, columns and facade panels possible on ordinary structures.',
    facts: [
      ['Typical thickness', '12 to 30 mm'],
      ['Weight', 'About 25% of precast concrete'],
      ['Finishes', 'Honed, acid-etched, sandblasted, through-coloured'],
      ['Best for', 'Facades, jalis, columns, planters, relief murals'],
    ],
  },
  {
    id: 'frp',
    tab: 'FRP',
    name: 'Fibre-reinforced plastic',
    image: 'ifa-curved-interior',
    alt: 'A meeting room lined with curved slatted walls under a lit oval ceiling',
    text:
      'Layers of glass fibre and resin laminated by hand over our patterns, producing shells that are seamless, very light and strong enough to span. FRP lets us build forms that would be impossible in stone, and finish them in anything from gloss lacquer to cold-cast bronze.',
    facts: [
      ['Typical thickness', '4 to 10 mm'],
      ['Weight', 'Light enough for rooftops and suspended work'],
      ['Finishes', 'Gelcoat, lacquer, metallic, stone-textured, cold-cast bronze'],
      ['Best for', 'Sculpture, installations, seating, large planters'],
    ],
  },
  {
    id: 'hand',
    tab: 'Hand finishing',
    name: 'Surfaces finished by hand',
    image: 'ifa-spinning-wheel-rear',
    alt: 'Hand-finished banded metal tones on a figure at the spinning wheel',
    text:
      'Every piece leaves the mould unfinished. Our finishers sand, patinate, lime-wash and seal each surface by hand, and match colour to samples from your site. This is where a cast object starts to look like it was always meant to be there.',
    facts: [
      ['Patinas', 'Bronze, copper, verdigris, iron'],
      ['Mineral', 'Lime-wash, tadelakt-style polish, stone dust'],
      ['Paint', 'Mineral pigments for murals'],
      ['Matching', 'To samples, swatches or existing stone'],
    ],
  },
]

export default function Materials() {
  const [active, setActive] = useState(0)
  const tabs = useRef([])
  const m = materials[active]

  const onKeyDown = (e) => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)) return
    e.preventDefault()
    const last = materials.length - 1
    const next = e.key === 'Home' ? 0 : e.key === 'End' ? last : e.key === 'ArrowRight' ? (active === last ? 0 : active + 1) : active === 0 ? last : active - 1
    setActive(next)
    tabs.current[next]?.focus()
  }

  return (
    <section className="on-dark bg-basalt py-24 text-limestone md:py-36" aria-label="Craftsmanship and materials">
      <div className="shell">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <SectionHeading
            className="md:col-span-7"
            tone="light"
            title="Craftsmanship and materials"
            intro="We work mainly in two engineered materials, and finish both by hand. Choosing between them is the first conversation we have about any project."
          />
          <div role="tablist" aria-label="Materials" className="flex gap-8 border-b border-limestone/15 md:col-span-5 md:justify-end" onKeyDown={onKeyDown}>
            {materials.map((mat, i) => (
              <button
                key={mat.id}
                ref={(el) => (tabs.current[i] = el)}
                role="tab"
                id={`tab-${mat.id}`}
                aria-selected={i === active}
                aria-controls={`panel-${mat.id}`}
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
                className={`relative pb-4 text-[1.0625rem] font-medium transition-colors duration-500 ${i === active ? 'text-limestone' : 'text-limestone/60 hover:text-limestone/80'}`}
              >
                {mat.tab}
                {i === active && <motion.span layoutId="material-tab" className="absolute inset-x-0 -bottom-px h-px bg-brass" transition={{ duration: 0.6, ease }} />}
              </button>
            ))}
          </div>
        </div>

        <div id={`panel-${m.id}`} role="tabpanel" aria-labelledby={`tab-${m.id}`} className="mt-16 grid gap-12 md:mt-20 md:grid-cols-12 md:gap-8">
          <div className="relative aspect-[4/3] overflow-hidden bg-graphite md:col-span-7">
            <AnimatePresence initial={false}>
              <motion.div
                key={m.id}
                className="absolute inset-0"
                initial={{ clipPath: 'inset(0% 0% 0% 100%)', zIndex: 1 }}
                animate={{ clipPath: 'inset(0% 0% 0% 0%)', zIndex: 1 }}
                exit={{ zIndex: 0, opacity: 0.999, transition: { duration: 1 } }}
                transition={{ duration: 1, ease }}
              >
                <Img src={img(m.image)} alt={m.alt} className="h-full w-full object-cover" />
              </motion.div>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={m.id}
              className="md:col-span-4 md:col-start-9"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease }}
            >
              <h3 className="t-h3">{m.name}</h3>
              <p className="mt-5 leading-[1.75] text-limestone/75">{m.text}</p>
              <dl className="mt-10">
                {m.facts.map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[8.5rem_1fr] gap-4 border-t border-brass/30 py-4 text-[0.9375rem]">
                    <dt className="text-limestone/55">{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

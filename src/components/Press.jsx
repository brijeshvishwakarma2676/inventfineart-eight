import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import SectionHeading from './SectionHeading'
import Img from './Img'
import { img } from '../data/images'
import { press, pressDate, pressQuote } from '../data/press'
import { lockScroll } from '../lib/smoothScroll'
import { fadeUp, stagger, viewport } from '../lib/motion'

/**
 * "In the press": the newspaper cuttings, each opening the full page in a viewer.
 * On phones the cuttings scroll sideways; from tablet width they sit in a grid.
 */
export default function Press({ className = '' }) {
  const [open, setOpen] = useState(null)
  const dialog = useRef(null)

  useEffect(() => {
    const d = dialog.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
    lockScroll('press', !!open)
    return () => lockScroll('press', false)
  }, [open])

  return (
    <section className={`py-24 md:py-36 ${className}`} aria-label="In the press">
      <div className="shell grid gap-12 md:grid-cols-12 md:gap-8">
        <SectionHeading
          className="md:col-span-6"
          context="In the press"
          title="Unveiled in Nagpur, in three languages."
          intro="In January 2015 the Sculpture of Hawker was unveiled at Samvidhan Square, Nagpur, by a senior hawker, Gajanan Meshram. The Lokmat papers covered it in English, Hindi and Marathi."
        />
        <motion.figure variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport} className="md:col-span-5 md:col-start-8 md:self-end">
          <blockquote className="font-display text-[1.35rem] leading-snug md:text-[1.5rem]">“{pressQuote.text}”</blockquote>
          <figcaption className="t-label mt-5 text-ash">
            {pressQuote.name}, in {pressQuote.source}
          </figcaption>
        </motion.figure>
      </div>

      <div className="mt-14 overflow-x-auto overscroll-x-contain pb-6 [scrollbar-width:thin] md:mt-20 md:overflow-visible md:pb-0">
        <motion.ul
          className="flex w-max snap-x snap-mandatory gap-4 px-[clamp(1.25rem,4vw,3.5rem)] md:grid md:w-auto md:grid-cols-3 md:gap-8 lg:grid-cols-5"
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {press.map((p) => (
            <motion.li key={p.image} variants={fadeUp} className="w-[68vw] max-w-[18rem] shrink-0 snap-start md:w-auto md:max-w-none">
              <button type="button" onClick={() => setOpen(p)} className="group block w-full text-left" aria-label={`Read the cutting: ${p.headline}, ${p.paper}`}>
                <div className="aspect-[4/5] overflow-hidden bg-plaster shadow-[0_1px_0_rgba(0,0,0,0.04)]">
                  <Img src={img(p.image)} alt="" className="h-full w-full object-cover object-top transition-transform duration-[1.2s] ease-[var(--ease-sculpt)] group-hover:scale-[1.04]" />
                </div>
                <p className="t-label mt-4 text-bronze">
                  {p.paper} · {p.language}
                </p>
                <p lang={p.lang} className="mt-2 font-display text-[1.15rem] leading-snug">{p.headline}</p>
                {p.gloss && <p className="mt-1 text-[0.9rem] text-ash">“{p.gloss}”</p>}
              </button>
            </motion.li>
          ))}
        </motion.ul>
      </div>
      <p className="shell t-label mt-6 text-ash">All published {pressDate}. Select a cutting to read it.</p>

      <dialog
        ref={dialog}
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === dialog.current && setOpen(null)}
        className="m-auto max-h-[92svh] w-[min(64rem,94vw)] bg-limestone p-0 text-graphite backdrop:bg-graphite/80"
        aria-label={open ? `${open.headline}, ${open.paper}` : 'Press cutting'}
      >
        {open && (
          <div className="flex max-h-[92svh] flex-col">
            <div className="flex items-center justify-between gap-4 border-b border-graphite/10 px-5 py-3">
              <p className="t-label text-ash">
                {open.paper} · {open.language} · {pressDate}
              </p>
              <div className="flex items-center gap-5">
                <a href={img(open.full)} target="_blank" rel="noopener" className="link-line t-label">
                  Full size
                </a>
                <button type="button" onClick={() => setOpen(null)} className="t-label" autoFocus>
                  Close
                </button>
              </div>
            </div>
            <div className="overflow-auto" data-lenis-prevent>
              <img src={img(open.full)} alt={`${open.paper}, ${pressDate}: ${open.headline}`} className="block h-auto w-full" />
            </div>
          </div>
        )}
      </dialog>
    </section>
  )
}

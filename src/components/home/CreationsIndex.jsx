import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import SectionHeading from '../SectionHeading'
import Img from '../Img'
import { categories } from '../../data/categories'
import { products } from '../../data/products'
import { img } from '../../data/images'
import { ease } from '../../lib/motion'

/**
 * The four services as an index of names. Hovering or focusing a name hangs
 * its image in the frame beside the list, like changing the work on a gallery wall.
 */
export default function CreationsIndex() {
  const [active, setActive] = useState(categories[0].slug)
  const current = categories.find((c) => c.slug === active)
  const count = (slug) => products.filter((p) => p.category === slug).length

  return (
    <section className="border-t border-graphite/10 py-24 md:py-36" aria-labelledby="creations-title">
      <div className="shell">
        <div className="grid gap-6 md:grid-cols-12">
          <SectionHeading
            className="md:col-span-7"
            title="Explore our creations"
            intro="Four services, one factory. Each collection is a starting point: almost everything we make is resized, reshaped or recoloured for the space it is going into."
          />
        </div>

        <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-12 md:gap-8">
          <ul className="md:col-span-7">
            {categories.map((c) => {
              const isActive = c.slug === active
              return (
                <li key={c.slug} className="border-t border-graphite/15 last:border-b">
                  <Link
                    to={`/collections?category=${c.slug}`}
                    onMouseEnter={() => setActive(c.slug)}
                    onFocus={() => setActive(c.slug)}
                    className="group grid grid-cols-[1fr_auto] items-center gap-4 py-6 md:py-8"
                  >
                    <span
                      className={`font-display text-[2.25rem] leading-[1.05] transition-[color,transform] duration-700 ease-[var(--ease-sculpt)] sm:text-[3rem] lg:text-[4.25rem] ${
                        isActive ? 'text-graphite md:translate-x-4' : 'text-graphite md:text-graphite/35'
                      }`}
                    >
                      {c.name}
                    </span>
                    <span className="flex items-center gap-4">
                      <span className="t-label hidden text-ash sm:inline">{count(c.slug)} pieces</span>
                      <span className="relative block size-16 overflow-hidden md:hidden">
                        <Img src={img(c.image)} alt="" className="h-full w-full object-cover" />
                      </span>
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="hidden md:col-span-4 md:col-start-9 md:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden bg-plaster">
                <AnimatePresence initial={false}>
                  <motion.img
                    key={current.slug}
                    src={img(current.image)}
                    alt={current.alt}
                    className="absolute inset-0 h-full w-full object-cover"
                    initial={{ clipPath: 'inset(100% 0% 0% 0%)', scale: 1.1, zIndex: 1 }}
                    animate={{ clipPath: 'inset(0% 0% 0% 0%)', scale: 1, zIndex: 1 }}
                    exit={{ zIndex: 0, opacity: 0.999, transition: { duration: 0.9 } }}
                    transition={{ duration: 0.9, ease }}
                  />
                </AnimatePresence>
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={current.slug}
                  className="mt-5 max-w-[30rem] leading-relaxed text-ash"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.4, ease }}
                >
                  {current.blurb}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

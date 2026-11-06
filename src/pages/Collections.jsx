import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import PageTransition from '../components/PageTransition'
import RevealText from '../components/RevealText'
import ProductCard from '../components/ProductCard'
import CustomCTA from '../components/CustomCTA'
import usePageMeta from '../hooks/usePageMeta'
import { categories, categoryBySlug } from '../data/categories'
import { products } from '../data/products'
import { ease } from '../lib/motion'

// A repeating rhythm of widths, aspect ratios and offsets, so the grid reads like a hung wall rather than a shop shelf.
// Each slot has a frame for upright photographs and one for landscape photographs (`wide` pieces), so no work is cropped badly.
const rhythm = [
  { col: 'md:col-span-7', aspect: 'aspect-[4/5]', wide: 'aspect-[4/3]' },
  { col: 'md:col-span-4 md:col-start-9 md:mt-40', aspect: 'aspect-[3/4]', wide: 'aspect-[4/3]' },
  { col: 'md:col-span-4 md:col-start-2', aspect: 'aspect-[3/4]', wide: 'aspect-[4/3]' },
  { col: 'md:col-span-5 md:col-start-7 md:mt-24', aspect: 'aspect-[4/5]', wide: 'aspect-[4/3]' },
  { col: 'md:col-span-6 md:col-start-4', colTall: 'md:col-span-4 md:col-start-5', aspect: 'aspect-[4/5]', wide: 'aspect-[16/11]' },
]

export default function Collections() {
  const [params, setParams] = useSearchParams()
  const selected = categoryBySlug[params.get('category')] ? params.get('category') : 'all'
  const category = categoryBySlug[selected]

  usePageMeta(
    category ? category.name : 'Collections',
    category ? category.blurb : 'Sculptures, planters and pots, murals and wall features, and customised FRP and GRC products, made by Invent Fine Art.'
  )

  const items = useMemo(() => (selected === 'all' ? products : products.filter((p) => p.category === selected)), [selected])

  const choose = (slug) => {
    if (slug === 'all') setParams({}, { replace: true, preventScrollReset: true })
    else setParams({ category: slug }, { replace: true, preventScrollReset: true })
  }

  const filters = [{ slug: 'all', name: 'All works', count: products.length }, ...categories.map((c) => ({ ...c, count: products.filter((p) => p.category === c.slug).length }))]

  return (
    <PageTransition>
      <section className="shell pb-12 pt-32 md:pb-16 md:pt-44">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <RevealText as="h1" text="Collections" className="t-h1" animateOnMount delay={0.15} />
          </div>
          <div className="md:col-span-4 md:col-start-9 md:self-end">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={selected}
                className="t-lead text-ash"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease }}
              >
                {category
                  ? category.blurb
                  : 'Pieces we make again and again, each one adjusted in size, finish or colour for its setting. Use them as they are or as the start of a commission.'}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        <LayoutGroup>
          <div className="mt-14 md:mt-20">
            <div role="group" aria-label="Filter by category" className="flex gap-7 overflow-x-auto border-b border-graphite/15 [scrollbar-width:none] md:gap-10">
              {filters.map((f) => {
                const active = selected === f.slug
                return (
                  <button
                    key={f.slug}
                    type="button"
                    onClick={() => choose(f.slug)}
                    aria-pressed={active}
                    className={`relative shrink-0 whitespace-nowrap py-5 text-[0.975rem] font-medium transition-colors duration-500 ${active ? 'text-graphite' : 'text-ash hover:text-graphite'}`}
                  >
                    {f.name}
                    <sup className="ml-1 text-[0.7rem] text-ash">{f.count}</sup>
                    {active && <motion.span layoutId="filter-line" className="absolute inset-x-0 -bottom-px h-[2px] bg-bronze" transition={{ duration: 0.6, ease }} />}
                  </button>
                )
              })}
            </div>
          </div>
        </LayoutGroup>
      </section>

      <section className="shell pb-24 md:pb-40" aria-live="polite">
        <p className="sr-only">{items.length} pieces shown</p>
        <motion.div layout className="grid gap-x-8 gap-y-20 sm:grid-cols-2 md:grid-cols-12 md:gap-y-28">
          <AnimatePresence mode="popLayout">
            {items.map((p, i) => {
              const r = rhythm[i % rhythm.length]
              return <ProductCard key={p.slug} product={p} index={i} aspect={p.wide ? r.wide : r.aspect} className={p.wide ? r.col : r.colTall || r.col} />
            })}
          </AnimatePresence>
        </motion.div>
      </section>

      <CustomCTA
        title={['Need it larger,', 'smaller or in', 'another colour?']}
        text="Almost every piece in the collections can be resized, re-proportioned or finished to match your project. Send us the piece and your space, and we will come back with options and a price."
        image="ifa-face-planter"
      />
    </PageTransition>
  )
}

import { Link, useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import { MessageCircle } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import ImageReveal from '../components/ImageReveal'
import RevealText from '../components/RevealText'
import ProductCard from '../components/ProductCard'
import Button from '../components/Button'
import NotFound from './NotFound'
import usePageMeta from '../hooks/usePageMeta'
import { productBySlug, products } from '../data/products'
import { categoryBySlug } from '../data/categories'
import { img } from '../data/images'
import { whatsappLink } from '../data/site'
import { ease } from '../lib/motion'

export default function ProductDetails() {
  const { slug } = useParams()
  const product = productBySlug[slug]
  usePageMeta(product?.name, product?.summary)
  if (!product) return <NotFound />

  const category = categoryBySlug[product.category]
  const related = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 2)
  const fill = related.length < 2 ? products.filter((p) => p.category !== product.category).slice(0, 2 - related.length) : []
  const enquiry = `/contact?piece=${encodeURIComponent(`${product.name} (${product.code})`)}&type=${product.category}`

  return (
    <PageTransition>
      <article className="shell pb-24 pt-28 md:pb-36 md:pt-36">
        <nav aria-label="Breadcrumb" className="t-label text-ash">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link to="/collections" className="link-line">Collections</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link to={`/collections?category=${category.slug}`} className="link-line">{category.name}</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-graphite">{product.name}</li>
          </ol>
        </nav>

        <div className="mt-10 grid gap-14 md:mt-14 md:grid-cols-12 md:gap-8">
          <div className="space-y-4 md:col-span-7 md:space-y-8">
            <ImageReveal src={img(product.images[0])} alt={product.name} priority className="aspect-[4/5]" />
            {product.images.slice(1).map((name) => (
              <ImageReveal key={name} src={img(name)} alt={`${product.name}, detail and process`} parallax className="hidden aspect-[4/3] md:ml-[18%] md:block" />
            ))}
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <div className="md:sticky md:top-28">
              <p className="t-label text-bronze">{category.name}, catalogue no. {product.code}</p>
              <RevealText as="h1" text={product.name} className="t-h2 mt-4" animateOnMount delay={0.2} />
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.5 }}>
                <p className="t-lead mt-6 text-graphite">{product.summary}</p>
                <p className="mt-5 leading-[1.75] text-ash">{product.description}</p>

                <dl className="mt-10">
                  {Object.entries(product.specs).map(([k, v]) => (
                    <div key={k} className="grid grid-cols-[7.5rem_1fr] gap-4 border-t border-graphite/15 py-3.5 text-[0.95rem]">
                      <dt className="text-ash">{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                  <div className="grid grid-cols-[7.5rem_1fr] gap-4 border-y border-graphite/15 py-3.5 text-[0.95rem]">
                    <dt className="text-ash">Suitable for</dt>
                    <dd>{product.use}</dd>
                  </div>
                </dl>

                <p className="mt-6 text-[0.95rem] leading-relaxed text-ash">
                  Made to order. Size, proportion, finish and colour can all be changed for your project.
                </p>

                <div className="mt-8 flex flex-col gap-3">
                  <Button to={enquiry} size="lg">Enquire about this piece</Button>
                  <Button
                    href={whatsappLink(`Hello, I am interested in ${product.name} (${product.code}). Could you share sizes and pricing?`)}
                    variant="outline"
                    size="lg"
                    icon={MessageCircle}
                  >
                    Ask on WhatsApp
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* On phones the detail views follow the description instead of preceding it */}
          {product.images.slice(1).map((name) => (
            <ImageReveal key={`m-${name}`} src={img(name)} alt={`${product.name}, detail and process`} className="aspect-[4/3] md:hidden" />
          ))}
        </div>
      </article>

      <section className="border-t border-graphite/10 bg-plaster py-24 md:py-32" aria-label="Related pieces">
        <div className="shell">
          <div className="flex items-end justify-between gap-6">
            <h2 className="t-h2">More from {category.name}</h2>
            <Link to={`/collections?category=${category.slug}`} className="link-line shrink-0 text-[0.9375rem] font-medium">
              View collection
            </Link>
          </div>
          <div className="mt-14 grid gap-16 sm:grid-cols-2 md:grid-cols-12 md:gap-8">
            {[...related, ...fill].map((p, i) => (
              <ProductCard key={p.slug} product={p} aspect={i === 0 ? 'aspect-[4/5]' : 'aspect-[3/4]'} className={i === 0 ? 'md:col-span-6' : 'md:col-span-4 md:col-start-9 md:mt-28'} />
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  )
}

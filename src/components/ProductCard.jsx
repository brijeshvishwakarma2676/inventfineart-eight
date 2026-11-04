import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import Img from './Img'
import { img } from '../data/images'
import { categoryBySlug } from '../data/categories'
import { ease } from '../lib/motion'

/**
 * A catalogue piece. On hover the lead image yields to a second view of the piece
 * (detail, process or setting), the way a gallery label invites a closer look.
 */
export default function ProductCard({ product, aspect = 'aspect-[4/5]', className = '', index = 0 }) {
  const [lead, second] = product.images
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20, transition: { duration: 0.25 } }}
      transition={{ duration: 0.9, ease, delay: Math.min(index, 6) * 0.06 }}
      className={className}
    >
      <Link to={`/collections/${product.slug}`} className="group block">
        <div className={`relative overflow-hidden bg-plaster ${aspect}`}>
          <Img
            src={img(lead)}
            alt={`${product.name}, ${categoryBySlug[product.category].name.toLowerCase()}`}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-[var(--ease-sculpt)] group-hover:scale-[1.05]"
          />
          {second && (
            <img
              src={img(second)}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 ease-[var(--ease-sculpt)] group-hover:opacity-100"
            />
          )}
          <span className="absolute left-4 top-4 bg-limestone/90 px-2.5 py-1 t-label text-graphite opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
            View piece
          </span>
        </div>
        <div className="mt-5 flex items-baseline justify-between gap-4">
          <h3 className="t-h3 relative">
            {product.name}
            <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-bronze transition-transform duration-700 ease-[var(--ease-sculpt)] group-hover:scale-x-100" />
          </h3>
          <span className="t-label shrink-0 text-ash">{product.code}</span>
        </div>
        <p className="mt-2 max-w-[34rem] text-[0.975rem] leading-relaxed text-ash">{product.summary}</p>
      </Link>
    </motion.article>
  )
}

import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { navigation, site, whatsappLink } from '../data/site'
import { categories } from '../data/categories'
import { ease } from '../lib/motion'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="on-dark relative overflow-hidden bg-basalt pb-[env(safe-area-inset-bottom)] text-limestone">
      <div className="shell pt-24 md:pt-32">
        <div className="grid gap-16 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <h2 className="t-h2 max-w-[14ch]">Visit the workshop.</h2>
            <p className="mt-6 max-w-[34ch] text-limestone/70">
              See pieces in progress, handle the materials and meet the people who make them. {site.visits}.
            </p>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              {[
                ['Office', site.address, site.mapUrl],
                ['Factory', site.factory.address, site.factory.mapUrl],
              ].map(([label, lines, map]) => (
                <div key={label}>
                  <h3 className="t-label text-limestone/60">{label}</h3>
                  <address className="mt-3 not-italic leading-relaxed text-limestone/90">
                    {lines.map((line) => (
                      <span key={line} className="block">{line}</span>
                    ))}
                  </address>
                  <a href={map} target="_blank" rel="noopener noreferrer" className="link-line mt-3 inline-block text-brass">
                    Open in Google Maps
                  </a>
                </div>
              ))}
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-7 md:pt-3">
            <div>
              <h3 className="t-label text-limestone/60">Studio</h3>
              <ul className="mt-5 space-y-3">
                <li><Link to="/" className="link-line">Home</Link></li>
                {navigation.map((n) => (
                  <li key={n.to}><Link to={n.to} className="link-line">{n.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="t-label text-limestone/60">Collections</h3>
              <ul className="mt-5 space-y-3">
                {categories.map((c) => (
                  <li key={c.slug}><Link to={`/collections?category=${c.slug}`} className="link-line">{c.name}</Link></li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h3 className="t-label text-limestone/60">Contact</h3>
              <ul className="mt-5 space-y-3">
                <li>
                  {/* Breaks, if it must, before the @ rather than mid-word */}
                  <a href={`mailto:${site.email}`} className="link-line">{site.email.split('@')[0]}<wbr />@{site.email.split('@')[1]}</a>
                </li>
                {site.phones.map((p) => (
                  <li key={p.href}><a href={`tel:${p.href}`} className="link-line">{p.label}</a></li>
                ))}
                <li><a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="link-line">WhatsApp</a></li>
              </ul>
              {site.socials.length > 0 && (
                <>
                  <h3 className="t-label mt-10 text-limestone/60">Follow</h3>
                  <ul className="mt-5 space-y-3">
                    {site.socials.map((s) => (
                      <li key={s.label}>
                        <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-line">{s.label}</a>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </nav>
        </div>

        <div className="mt-24 h-px bg-brass/40" />
        <motion.p
          aria-hidden="true"
          className="select-none whitespace-nowrap pt-6 font-display leading-[0.8] tracking-[-0.03em] text-limestone/[0.92]"
          style={{ fontSize: 'clamp(3rem, 14vw, 13.75rem)' }}
          initial={{ y: '30%', opacity: 0 }}
          whileInView={{ y: '0%', opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease }}
        >
          {site.name}
        </motion.p>
        <div className="flex flex-col gap-2 py-8 text-[0.875rem] text-limestone/55 sm:flex-row sm:justify-between">
          <p>© {year} {site.name}. Made to your design in our own factory since {site.founded}.</p>
          {site.hours && <p>{site.hours}</p>}
        </div>
      </div>
    </footer>
  )
}

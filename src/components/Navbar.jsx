import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { navigation, site, whatsappLink } from '../data/site'
import { ease } from '../lib/motion'

function Wordmark({ onClick }) {
  return (
    <Link to="/" onClick={onClick} className="group flex items-center gap-3" aria-label={`${site.name}, home`}>
      <svg viewBox="0 0 28 32" className="h-8 w-7" aria-hidden="true">
        <path d="M3 31V14a11 11 0 0 1 22 0v17" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="14" cy="21" r="4" className="fill-bronze transition-transform duration-700 ease-[var(--ease-sculpt)] group-hover:-translate-y-1" />
      </svg>
      <span className="font-display text-[1.35rem] leading-none tracking-[0.01em]">{site.name}</span>
    </Link>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  const location = useLocation()
  const toggleRef = useRef(null)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 24)
    setHidden(y > 160 && y > prev && !open)
  })

  useEffect(() => setOpen(false), [location.pathname])

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <a href="#main" className="sr-only z-[120] bg-graphite px-4 py-2 text-limestone focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>

      <motion.header
        className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-[background-color,border-color] duration-500 ${
          scrolled && !open ? 'border-b border-graphite/10 bg-limestone/95' : 'border-b border-transparent'
        }`}
        animate={{ y: hidden ? '-100%' : '0%' }}
        transition={{ duration: 0.5, ease }}
      >
        <div className="shell flex h-[4.5rem] items-center justify-between md:h-20">
          <Wordmark onClick={() => setOpen(false)} />

          <nav aria-label="Main" className="hidden items-center gap-10 md:flex">
            {navigation.map((item) => (
              <NavLink key={item.to} to={item.to} className="link-line text-[0.9375rem] font-medium">
                {item.label}
              </NavLink>
            ))}
          </nav>

          <Link
            to="/contact"
            className="group relative hidden h-11 items-center overflow-hidden border border-graphite/70 px-5 text-[0.9375rem] font-medium md:inline-flex"
          >
            <span className="absolute inset-0 translate-y-full bg-graphite transition-transform duration-[650ms] ease-[var(--ease-sculpt)] group-hover:translate-y-0" />
            <span className="relative transition-colors duration-500 group-hover:text-limestone">Start a commission</span>
          </Link>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="relative -mr-2 flex h-11 items-center gap-3 px-2 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <span className="t-label">{open ? 'Close' : 'Menu'}</span>
            <span className="relative block h-3 w-6" aria-hidden="true">
              <span className={`absolute left-0 top-0 h-px w-6 bg-graphite transition-transform duration-500 ${open ? 'translate-y-1.5 rotate-45' : ''}`} />
              <span className={`absolute bottom-0 left-0 h-px w-6 bg-graphite transition-transform duration-500 ${open ? '-translate-y-[5px] -rotate-45' : ''}`} />
            </span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-40 flex flex-col bg-limestone pb-[env(safe-area-inset-bottom)] pt-[calc(4.5rem+env(safe-area-inset-top))] md:hidden"
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)', transition: { duration: 0.5, ease: [0.65, 0, 0.35, 1] } }}
            transition={{ duration: 0.7, ease }}
          >
            <nav aria-label="Mobile" className="shell mt-8 flex flex-col">
              {[{ to: '/', label: 'Home' }, ...navigation].map((item, i) => (
                <div key={item.to} className="overflow-hidden border-b border-graphite/10">
                  <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 0.8, ease, delay: 0.15 + i * 0.06 }}
                  >
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }) => `block py-4 font-display text-[2.6rem] leading-none ${isActive ? 'text-bronze' : ''}`}
                    >
                      {item.label}
                    </NavLink>
                  </motion.div>
                </div>
              ))}
            </nav>
            <motion.div
              className="shell mt-auto space-y-2 pb-8 text-ash"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
            >
              <a href={`mailto:${site.email}`} className="block text-graphite">{site.email}</a>
              <a href={`tel:${site.phoneHref}`} className="block text-graphite">{site.phone}</a>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="link-line inline-block text-bronze">
                Message us on WhatsApp
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

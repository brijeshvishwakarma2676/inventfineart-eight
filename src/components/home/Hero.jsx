import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { animate, motion, useMotionValue, useReducedMotion, useScroll, useTransform } from 'motion/react'
import Button from '../Button'
import RevealText from '../RevealText'
import useMediaQuery from '../../hooks/useMediaQuery'
import { img, srcSetFor } from '../../data/images'
import { ease } from '../../lib/motion'
import { useLoaderDone } from '../../lib/loader'

const lerp = (a, b, t) => a + (b - a) * t
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

const INTRO =
  'We design and make sculpture, planters, murals and architectural elements in FRP and GRC, for hotels, homes and public spaces that want more than a finish.'

/**
 * The threshold. The page opens as a limestone wall with an arched opening.
 * Scrolling walks the visitor through the arch until the photograph fills the screen.
 */
export default function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const loaderDone = useLoaderDone()
  const desktop = useMediaQuery('(min-width: 768px)')
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  // Opening sequence: the arch fills upward from the floor once on load.
  const intro = useMotionValue(reduce ? 1 : 0)
  useEffect(() => {
    if (reduce) {
      intro.set(1)
      return
    }
    if (!loaderDone) return // the arch rises as the opening loader lifts away
    const controls = animate(intro, 1, { duration: 1.8, ease, delay: 0.1 })
    return () => controls.stop()
  }, [reduce, intro, loaderDone])

  // Arch window, in % of the viewport. Radius = half the window width, in vw.
  const win = desktop ? { top: 15, side: [55, 5] } : { top: 46, side: [6, 6] }
  const radius = (100 - win.side[0] - win.side[1]) / 2

  const clipPath = useTransform(() => {
    const i = intro.get()
    const p = reduce ? 0 : easeInOut(Math.min(scrollYProgress.get() / 0.7, 1))
    const top = lerp(lerp(100, win.top, i), 0, p)
    const left = lerp(win.side[0], 0, p)
    const right = lerp(win.side[1], 0, p)
    const r = lerp(radius, 0, p)
    return `inset(${top}% ${right}% 0% ${left}% round ${r}vw ${r}vw 0 0)`
  })

  const imageScale = useTransform(() => {
    const p = reduce ? 0 : Math.min(scrollYProgress.get() / 0.7, 1)
    return lerp(1.22, 1.08, intro.get()) - 0.08 * p
  })

  // On desktop the arch sits right of centre, so the photograph starts shifted to keep the work centred in it.
  const imageX = useTransform(() => {
    if (!desktop) return '0vw'
    const p = reduce ? 0 : easeInOut(Math.min(scrollYProgress.get() / 0.7, 1))
    return `${lerp(19, 0, p)}vw`
  })

  const textOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.3], ['0vh', '-12vh'])
  const captionOpacity = useTransform(scrollYProgress, [0.62, 0.8], [0, 1])
  const scrimOpacity = useTransform(scrollYProgress, [0.5, 0.8], [0, 1])

  return (
    <>
      <section ref={ref} className={reduce ? 'relative h-svh' : 'relative h-[210svh] md:h-[240vh]'} aria-label="Introduction">
        <div className="sticky top-0 h-svh overflow-hidden">
          {/* The photograph behind the opening */}
          <motion.div className="absolute inset-0 bg-plaster" style={{ clipPath }}>
            <motion.img
              src={img('ifa-lobby-installation')}
              srcSet={srcSetFor(img('ifa-lobby-installation'))}
              sizes="125vw"
              alt="Three illuminated sculptural cones in a lobby, by Invent Fine Art"
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ scale: imageScale, x: imageX, objectPosition: desktop ? '50% 50%' : '57% 50%' }}
            />
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-graphite/70 via-graphite/10 to-transparent"
              style={{ opacity: scrimOpacity }}
            />
          </motion.div>

          {/* Words on the wall */}
          <motion.div className="relative z-10 h-full" style={reduce ? undefined : { opacity: textOpacity, y: textY }}>
            <div className="shell flex h-full flex-col pt-[6.5rem] md:pt-[8.5rem]">
              {/* On desktop the size is capped so "meets architecture." ends before the arch opening (which starts at 55vw) */}
              <RevealText as="h1" text={['Where art', 'meets architecture.']} className="t-display max-w-[11ch] md:max-w-none md:text-[clamp(2.6rem,5.7vw,7rem)]" animateOnMount delay={0.55} />

              <div className="mt-auto hidden max-w-[29rem] pb-12 md:block">
                <motion.p
                  className="t-lead text-ash"
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  animate={loaderDone ? { opacity: 1, y: 0 } : undefined}
                  transition={{ duration: 1, ease, delay: 1.25 }}
                >
                  {INTRO}
                </motion.p>
                <motion.div
                  className="mt-8 flex flex-wrap gap-3"
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  animate={loaderDone ? { opacity: 1, y: 0 } : undefined}
                  transition={{ duration: 1, ease, delay: 1.4 }}
                >
                  <Button to="/projects">Explore our work</Button>
                  <Button to="/about" variant="outline">Discover our studio</Button>
                </motion.div>
                <ScrollCue className="mt-12" />
              </div>
            </div>
          </motion.div>

          {/* Caption once the visitor has stepped through */}
          <motion.div className="absolute inset-x-0 bottom-0 z-10" style={{ opacity: reduce ? 0 : captionOpacity }}>
            <div className="shell flex flex-col gap-4 pb-10 text-limestone md:flex-row md:items-end md:justify-between md:pb-14">
              <p className="max-w-[30rem] font-display text-[1.5rem] leading-snug md:text-[2rem]">
                Three lit forms, rising through a lobby.
              </p>
              <Link to="/collections" className="link-line self-start text-[0.9375rem] font-medium md:self-auto">
                Illuminated lobby installation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* On small screens the introduction follows the threshold */}
      <div className="shell pb-6 pt-14 md:hidden">
        <p className="t-lead text-ash">{INTRO}</p>
        <div className="mt-8 flex flex-col gap-3">
          <Button to="/projects">Explore our work</Button>
          <Button to="/about" variant="outline">Discover our studio</Button>
        </div>
      </div>
    </>
  )
}

function ScrollCue({ className = '' }) {
  return (
    <div className={`flex items-center gap-4 text-ash ${className}`} aria-hidden="true">
      <span className="relative block h-12 w-px overflow-hidden bg-graphite/15">
        <span className="absolute inset-x-0 top-0 h-1/2 animate-[cue_2.4s_var(--ease-sculpt)_infinite] bg-bronze" />
      </span>
      <span className="t-label">Scroll to step inside</span>
      <style>{`@keyframes cue { 0% { transform: translateY(-100%) } 60%, 100% { transform: translateY(200%) } }`}</style>
    </div>
  )
}

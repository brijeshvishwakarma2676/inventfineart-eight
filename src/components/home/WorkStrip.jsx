import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { useInView, useReducedMotion } from 'motion/react'
import SectionHeading from '../SectionHeading'
import Img from '../Img'
import { img } from '../../data/images'
import { site } from '../../data/site'

// Real work from every service, upright and landscape mixed so the row has a rhythm. `ratio` is the photo's own shape.
const work = [
  { image: 'ifa-red-runner', caption: 'Runner around a column', ratio: '3 / 4' },
  { image: 'ifa-relief-wall', caption: 'Carved relief wall', ratio: '4 / 3' },
  { image: 'ifa-kite-flyer', caption: 'Figure with kites', ratio: '3 / 5' },
  { image: 'ifa-rock-waterfall', caption: 'Rock waterfall', ratio: '4 / 3' },
  { image: 'ifa-grc-facade', caption: '3D façade wall in GRC', ratio: '3 / 4' },
  { image: 'ifa-mesh-rhino', caption: 'Rhinoceros in metal mesh', ratio: '5 / 3' },
  { image: 'ifa-elephant-planter', caption: 'Elephant planter', ratio: '4 / 5' },
  { image: 'ifa-leaf-lights', caption: 'Illuminated leaf wall lights', ratio: '4 / 3' },
  { image: 'ifa-climbing-columns', caption: 'Columns of climbing figures', ratio: '5 / 6' },
  { image: 'ifa-garden-pergola', caption: 'Garden pergola', ratio: '3 / 2' },
  { image: 'ks-hawker-trees', caption: 'Sculpture of Hawker', ratio: '3 / 4' },
  { image: 'ifa-wave-sculpture', caption: 'Wave wall sculpture', ratio: '5 / 4' },
  { image: 'ks-embrace-studio', caption: 'Embrace, in stone', ratio: '5 / 7' },
]

/**
 * A slow, continuous procession of finished work. It pauses under the pointer so a piece can be looked at,
 * and becomes a plain sideways-scrolling row for visitors who ask for less motion.
 */
export default function WorkStrip() {
  const reduce = useReducedMotion()
  const stripRef = useRef(null)
  const onScreen = useInView(stripRef, { margin: '200px 0px' }) // the loop only runs while it can be seen
  const items = reduce ? work : [...work, ...work] // the second copy makes the loop seamless

  return (
    <section className="overflow-hidden py-24 md:py-36" aria-label="From the workshop">
      <div className="shell flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          context="From the workshop"
          title={`${new Date().getFullYear() - site.founded} years of work, made by hand.`}
          intro="Sculpture in stone, metal and FRP, planters, murals and GRC, all made in our own factory near Mumbai."
        />
        <Link to="/projects" className="link-line self-start text-[0.9375rem] font-medium md:self-auto">
          See the projects
        </Link>
      </div>

      <div
        ref={stripRef}
        className={`group/strip mt-14 md:mt-20 ${reduce ? 'overflow-x-auto pb-4' : ''}`}
        style={{ maskImage: 'linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent)' }}
      >
        <ul
          className={`flex w-max items-end ${
            reduce ? 'gap-4 px-[clamp(1.25rem,4vw,3.5rem)] md:gap-6' : `animate-[strip_90s_linear_infinite] group-hover/strip:[animation-play-state:paused] ${onScreen ? '' : '[animation-play-state:paused]'}`
          }`}
        >
          {items.map((w, i) => {
            const copy = i >= work.length
            return (
              // Each item carries its own right margin, so the two halves are exactly equal and -50% loops cleanly.
              <li key={`${w.image}-${i}`} className={reduce ? '' : 'mr-4 md:mr-6'} aria-hidden={copy || undefined}>
                <figure>
                  <div className="h-[15rem] overflow-hidden bg-plaster md:h-[23rem]" style={{ aspectRatio: w.ratio }}>
                    <Img
                      src={img(w.image)}
                      alt={copy ? '' : w.caption}
                      className="h-full w-full object-cover transition-transform duration-[1.4s] ease-[var(--ease-sculpt)] hover:scale-[1.04]"
                    />
                  </div>
                  <figcaption className="t-label mt-3 text-ash">{w.caption}</figcaption>
                </figure>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

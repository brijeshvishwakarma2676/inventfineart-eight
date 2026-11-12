import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import Img from './Img'
import { ease, viewport } from '../lib/motion'

// The image settles from a slight zoom as it is revealed.
const settle = (reduce, delay) => ({
  initial: reduce ? false : { scale: 1.14 },
  whileInView: { scale: 1 },
  viewport,
  transition: { duration: 1.8, ease, delay },
})

function StillLayer({ reduce, delay, children }) {
  return <motion.div className="absolute inset-0" {...settle(reduce, delay)}>{children}</motion.div>
}

// Only parallax images track the scroll position; the rest add no scroll work at all.
function ParallaxLayer({ reduce, delay, children }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-7%', '7%'])
  return (
    <motion.div ref={ref} className="absolute -inset-y-[8%] inset-x-0" style={{ y }} {...settle(reduce, delay)}>
      {children}
    </motion.div>
  )
}

/**
 * Image that is unveiled upward when it enters the viewport, with optional parallax.
 * The wrapper owns the aspect ratio, so nothing shifts while the image loads.
 */
export default function ImageReveal({
  src,
  alt,
  className = '',
  imgClassName = '',
  arch = false,
  parallax = false,
  priority = false,
  delay = 0,
  hover = false,
  children,
}) {
  const reduce = useReducedMotion()
  const Layer = parallax && !reduce ? ParallaxLayer : StillLayer

  return (
    <motion.div
      className={`relative overflow-hidden bg-plaster ${arch ? 'arch' : ''} ${className}`}
      initial={reduce ? false : { clipPath: 'inset(100% 0% 0% 0%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={viewport}
      transition={{ duration: 1.3, ease, delay }}
    >
      <Layer reduce={reduce} delay={delay}>
        <Img
          src={src}
          alt={alt}
          priority={priority}
          className={`h-full w-full object-cover ${hover ? 'transition-transform duration-[1.2s] ease-[var(--ease-sculpt)] group-hover:scale-[1.04]' : ''} ${imgClassName}`}
        />
      </Layer>
      {children}
    </motion.div>
  )
}

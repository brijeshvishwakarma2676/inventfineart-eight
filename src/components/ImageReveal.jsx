import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import Img from './Img'
import { ease, viewport } from '../lib/motion'

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
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-7%', '7%'])
  const moving = parallax && !reduce

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden bg-plaster ${arch ? 'arch' : ''} ${className}`}
      initial={reduce ? false : { clipPath: 'inset(100% 0% 0% 0%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={viewport}
      transition={{ duration: 1.3, ease, delay }}
    >
      <motion.div
        className={`absolute ${moving ? '-inset-y-[8%] inset-x-0' : 'inset-0'}`}
        style={moving ? { y } : undefined}
        initial={reduce ? false : { scale: 1.14 }}
        whileInView={{ scale: 1 }}
        viewport={viewport}
        transition={{ duration: 1.8, ease, delay }}
      >
        <Img
          src={src}
          alt={alt}
          priority={priority}
          className={`h-full w-full object-cover ${hover ? 'transition-transform duration-[1.2s] ease-[var(--ease-sculpt)] group-hover:scale-[1.04]' : ''} ${imgClassName}`}
        />
      </motion.div>
      {children}
    </motion.div>
  )
}

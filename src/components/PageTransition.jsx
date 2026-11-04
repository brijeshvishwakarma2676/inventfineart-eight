import { motion } from 'motion/react'
import { ease, easeIn } from '../lib/motion'

// Wraps each route: content settles in from below, and lifts away on exit.
export default function PageTransition({ children }) {
  return (
    <motion.main
      id="main"
      tabIndex={-1}
      className="outline-none"
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease, delay: 0.05 } }}
      exit={{ opacity: 0, y: -14, transition: { duration: 0.38, ease: easeIn } }}
    >
      {children}
    </motion.main>
  )
}

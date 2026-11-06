import { lazy, Suspense } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig } from 'motion/react'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import { scrollToTop } from './lib/smoothScroll'

// The landing page ships in the main bundle; every other page loads on first visit.
const About = lazy(() => import('./pages/About'))
const Collections = lazy(() => import('./pages/Collections'))
const ProductDetails = lazy(() => import('./pages/ProductDetails'))
const Projects = lazy(() => import('./pages/Projects'))
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Holds the page height while a route's code arrives, so the footer doesn't jump up.
const page = (Component) => (
  <Suspense fallback={<div className="min-h-svh" aria-busy="true" />}>
    <Component />
  </Suspense>
)

function AnimatedRoutes() {
  const location = useLocation()
  return (
    // The old page lifts away before the new one settles in; scroll resets in between.
    <AnimatePresence mode="wait" onExitComplete={scrollToTop}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={page(Home)} />
        <Route path="/about" element={page(About)} />
        <Route path="/collections" element={page(Collections)} />
        <Route path="/collections/:slug" element={page(ProductDetails)} />
        <Route path="/projects" element={page(Projects)} />
        <Route path="/projects/:slug" element={page(ProjectDetails)} />
        <Route path="/contact" element={page(Contact)} />
        <Route path="*" element={page(NotFound)} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    // reducedMotion="user": transforms and layout animations are skipped for visitors who ask for less motion.
    <MotionConfig reducedMotion="user">
      <MainLayout>
        <AnimatedRoutes />
      </MainLayout>
    </MotionConfig>
  )
}

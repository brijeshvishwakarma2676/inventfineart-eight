import PageTransition from '../components/PageTransition'
import CustomCTA from '../components/CustomCTA'
import Hero from '../components/home/Hero'
import StudioIntro from '../components/home/StudioIntro'
import CreationsIndex from '../components/home/CreationsIndex'
import FeaturedProjects from '../components/home/FeaturedProjects'
import Materials from '../components/home/Materials'
import Process from '../components/home/Process'
import usePageMeta from '../hooks/usePageMeta'

export default function Home() {
  usePageMeta()
  return (
    <PageTransition>
      <Hero />
      <StudioIntro />
      <CreationsIndex />
      <FeaturedProjects />
      <Materials />
      <Process />
      <CustomCTA />
    </PageTransition>
  )
}

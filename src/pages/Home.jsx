import PageTransition from '../components/PageTransition'
import CustomCTA from '../components/CustomCTA'
import Hero from '../components/home/Hero'
import StudioIntro from '../components/home/StudioIntro'
import CreationsIndex from '../components/home/CreationsIndex'
import FeaturedProjects from '../components/home/FeaturedProjects'
import Materials from '../components/home/Materials'
import Process from '../components/home/Process'
import Numbers from '../components/home/Numbers'
import WorkStrip from '../components/home/WorkStrip'
import usePageMeta from '../hooks/usePageMeta'

export default function Home() {
  usePageMeta()
  return (
    <PageTransition>
      <Hero />
      <StudioIntro />
      <Numbers />
      <CreationsIndex />
      <FeaturedProjects />
      <WorkStrip />
      <Materials />
      <Process />
      <CustomCTA />
    </PageTransition>
  )
}

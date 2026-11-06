import { MessageCircle } from 'lucide-react'
import Button from './Button'
import ImageReveal from './ImageReveal'
import RevealText from './RevealText'
import { img } from '../data/images'
import { whatsappLink } from '../data/site'
import { motion } from 'motion/react'
import { fadeUp, viewport } from '../lib/motion'

// Closing invitation used on most pages: an arched niche beside the question.
export default function CustomCTA({
  title = ['Have a wall, a courtyard', 'or a facade waiting', 'for something?'],
  text = 'Tell us about the space, the people who will use it and the date it needs to be ready. We will come back within two working days with first thoughts, a rough budget and the questions we need answered.',
  image = 'ifa-red-runner',
  whatsappText,
}) {
  return (
    <section className="bg-plaster py-24 md:py-36">
      <div className="shell grid items-end gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <ImageReveal src={img(image)} alt="" arch parallax className="aspect-[3/4] w-[72%] max-w-sm md:w-full" />
        </div>
        <div className="md:col-span-7 md:col-start-6 md:pb-6">
          <p className="t-label mb-6 text-bronze">Custom commissions</p>
          <RevealText as="h2" text={title} className="t-h1" />
          <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport} className="t-lead mt-8 max-w-[38rem] text-ash">
            {text}
          </motion.p>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport} className="mt-10 flex flex-wrap gap-4">
            <Button to="/contact" size="lg">Start a commission</Button>
            <Button href={whatsappLink(whatsappText)} variant="outline" size="lg" icon={MessageCircle}>Message us on WhatsApp</Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { Heart, Leaf, Sun } from 'lucide-react'
import { SEO } from '../components/SEO'

const rituals = [
  ['1986', 'A family recipe', 'The first mango pickle batch was mixed by hand in a sunlit home kitchen.'],
  ['2018', 'Shared with friends', 'What began as gifts for loved ones quietly became a local favourite.'],
  ['Today', 'Atchi travels home', 'The same patient recipes now reach tables across the country.'],
]

export function AboutPage() {
  return <div className="page-header-offset">
    <SEO title="Our Story | Atchi Pickles" description="The family recipes and slow traditions behind Atchi Pickles." />
    <section className="ml-intro">
      <motion.span className="ml-kicker" style={{ justifyContent: 'center' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Our family story</motion.span>
      <motion.h2 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>Made from memory.<br /><em>Passed with love.</em></motion.h2>
      <p>Atchi began with the kind of recipes that never needed measuring cups. A handful of spice, a patient afternoon and the instinct that only years in a family kitchen can teach.</p>
    </section>
    <section className="ml-process">
      <div className="ml-section-head"><span className="ml-kicker">The Atchi way</span><h2>Small rituals.<br /><em>Deep roots.</em></h2></div>
      <div className="ml-process-track" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {rituals.map(([year, title, text], index) => <motion.article className="ml-step" key={year} initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .16 }}>
          <span>{year}</span><div className="step-visual">{index === 0 ? <Sun /> : index === 1 ? <Heart /> : <Leaf />}</div><h3>{title}</h3><p>{text}</p>
        </motion.article>)}
      </div>
    </section>
    <section className="ml-review"><Leaf size={32} /><h2>“A jar should hold more<br />than flavour. It should hold a feeling.”</h2><p>THE ATCHI KITCHEN</p></section>
  </div>
}

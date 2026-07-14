import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDownRight, ArrowRight, Check, Heart, Leaf, Package, Sparkles, Star, Sun, Truck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import { products } from '../data/catalog'
import { SEO } from '../components/SEO'

const ritual = [
  ['01', 'Pick', 'Raw mangoes arrive while they still carry the morning cool.'],
  ['02', 'Pound', 'The masala is ground in patient, fragrant batches.'],
  ['03', 'Wait', 'Sun, oil and time turn every jar into something deeper.'],
]

export function HomePage() {
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, .2], [0, 110])
  return <div className="atchi-home">
    <SEO title="Atchi Pickles | A Spoonful Of Home" description="Atchi makes small-batch Indian pickles with family recipes and a little patience." />
    <section className="atchi-hero">
      <motion.div className="atchi-hero-photo" style={{ y: heroY }}>
        <motion.img src="/images/atchi/hero-kitchen.png" alt="Atchi mango pickle in a warm home kitchen" animate={{ scale: [1.03, 1.1, 1.03] }} transition={{ duration: 15, repeat: Infinity }} />
      </motion.div>
      <div className="atchi-hero-card">
        <span><Leaf size={13} /> From a family kitchen</span>
        <h1>A little<br /><em>achar.</em><br />A lot of<br />home.</h1>
        <p>Bright mangoes, sun-warmed spices and recipes that know their way back to your table.</p>
        <Link to="/shop">Open the pantry <ArrowRight size={16} /></Link>
      </div>
      <div className="atchi-hero-stamp"><Sun /><b>slow food</b><small>made under the sun</small></div>
      <div className="atchi-side-note">scroll for a spoonful <ArrowDownRight /></div>
    </section>

    <section className="atchi-marquee"><div>hand-cut mangoes <i /> stone-ground masala <i /> cold-pressed oils <i /> recipes with roots <i /> hand-cut mangoes <i /> stone-ground masala <i /> cold-pressed oils</div></section>

    <section className="atchi-opening">
      <motion.div initial={{ opacity: 0, x: -45 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
        <span className="atchi-label">01 · The feeling</span>
        <h2>Some flavours<br />do not need an<br /><em>introduction.</em></h2>
      </motion.div>
      <motion.div className="atchi-opening-note" initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <Leaf /><p>They arrive with hot rice, a quiet afternoon and the familiar clink of a spoon against glass.</p><Link to="/about">Read our story <ArrowRight /></Link>
      </motion.div>
    </section>

    <section className="atchi-shelf">
      <div className="atchi-section-top"><span className="atchi-label">02 · Pantry favourites</span><Link to="/shop">See every jar <ArrowRight /></Link></div>
      <h2>Pick your<br /><em>plus one.</em></h2>
      <div className="atchi-shelf-grid">{products.slice(0, 4).map((product, index) => <motion.div key={product.id} initial={{ opacity: 0, y: 45 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .1 }}><ProductCard product={product} /></motion.div>)}</div>
    </section>

    <section className="atchi-ritual" id="ritual">
      <div className="atchi-ritual-intro"><span className="atchi-label">03 · The ritual</span><h2>Good pickle<br /><em>takes its time.</em></h2><p>No shortcuts. No hurried batches. Just the steady rituals that make a jar taste alive.</p></div>
      <div className="atchi-ritual-list">{ritual.map(([number, title, copy], index) => <motion.article key={number} initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * .12 }}><b>{number}</b><span>{title}</span><p>{copy}</p><Leaf /></motion.article>)}</div>
    </section>

    <section className="atchi-quote">
      <motion.div initial={{ scale: .92, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }}>
        <Sparkles /><h2>“The mango pickle disappeared<br />before the weekend did.”</h2><div>{[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" />)}</div><p>ANJALI RAO · HYDERABAD</p>
      </motion.div>
    </section>

    <section className="atchi-promises">
      <div><Check /><b>Nothing artificial</b><p>Natural ingredients and familiar pantry staples.</p></div>
      <div><Heart /><b>Made like home</b><p>Handmade in small batches with family recipes.</p></div>
      <div><Truck /><b>Travels with care</b><p>Food-safe packaging and pan-India delivery.</p></div>
      <div><Package /><b>Always fresh</b><p>Packed only when each batch is ready.</p></div>
    </section>

    <section className="atchi-letter">
      <span>A note from our kitchen</span><h2>Come for the pickle.<br /><em>Stay for the stories.</em></h2><p>Fresh batches, serving ideas and letters from home. Occasionally, a little surprise.</p>
      <form onSubmit={event => event.preventDefault()}><input type="email" placeholder="your@email.com" /><button>Join the table <ArrowRight /></button></form>
    </section>
  </div>
}

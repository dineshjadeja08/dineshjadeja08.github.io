import { motion } from 'framer-motion'
import { Search, SlidersHorizontal } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ProductCard } from '../components/ProductCard'
import { SEO } from '../components/SEO'
import type { Product } from '../data/catalog'
import { fetchDbProducts } from '../lib/products'

export function CollectionsPage() {
  const [query, setQuery] = useState('')
  const [mood, setMood] = useState('All jars')
  const [items, setItems] = useState<Product[]>([])
  useEffect(() => { fetchDbProducts().then(setItems) }, [])
  const filtered = items.filter(item => (mood === 'All jars' || item.color.includes(mood)) && `${item.name} ${item.copy}`.toLowerCase().includes(query.toLowerCase()))

  return <div className="pantry-page">
    <SEO title="The Pantry | Atchi" description="Browse Atchi's homemade pickle pantry." />
    <section className="pantry-hero">
      <span className="atchi-label">A shelf full of good things</span>
      <h1>Open the<br /><em>pantry.</em></h1>
      <p>Every jar has a different mood. Pick one for your table, or make room for a few.</p>
    </section>
    <section className="pantry-toolbar">
      <div><SlidersHorizontal size={16} />{['All jars', 'Fiery', 'Tangy', 'Classic'].map(item => <button className={mood === item ? 'active' : ''} onClick={() => setMood(item)} key={item}>{item}</button>)}</div>
      <label><Search size={17} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search the shelf" /></label>
    </section>
    <section className="pantry-grid">
      {filtered.map((product, index) => <motion.div key={product.id} initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .08 }}><ProductCard product={product} /></motion.div>)}
      {!filtered.length && <p className="pantry-empty">That shelf is empty. Try another flavour mood.</p>}
    </section>
  </div>
}

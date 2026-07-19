import { motion } from 'framer-motion'
import { ArrowRight, Code2, Laptop, Mail, MapPin, MessageCircle, Search, Send, type LucideIcon } from 'lucide-react'
import { BookCallButton } from '../components/booking/BookCallButton'
import { siteConfig, whatsappUrl } from '../lib/config'

const capabilities: { label: string; Icon: LucideIcon }[] = [
  { label: 'Clear Delivery', Icon: Send },
  { label: 'Clean Development', Icon: Code2 },
  { label: 'Basic SEO Setup', Icon: Search },
  { label: 'Mobile Responsive', Icon: Laptop },
]

export function HeroSection() {
  return (
    <section className="hero" id="home">
      <motion.div className="hero-copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <span className="hello">👋 Hey, I'm Dinesh</span>
        <h1>
          I build <em>modern</em>, clear and <em>responsive</em> websites for growing businesses.
        </h1>
        <p>I help startups, local businesses and founders turn their ideas into clean, practical websites and web applications.</p>
        <div className="hero-actions">
          <BookCallButton type="discovery" label="Book a Free Discovery Call" className="primary-button" />
          <a className="secondary-button" href="#work">
            View My Work <ArrowRight size={18} />
          </a>
        </div>
        <div className="hero-contact" aria-label="Direct contact details">
          <a href={`mailto:${siteConfig.email}`}><Mail size={16} /> {siteConfig.email}</a>
          <a href={whatsappUrl()} target="_blank" rel="noreferrer"><MessageCircle size={16} /> WhatsApp me directly</a>
        </div>
        <div className="trust-row" aria-label="Capabilities">
          {capabilities.map(({ label, Icon }) => (
            <span key={label}><Icon size={16} /> {label}</span>
          ))}
        </div>
      </motion.div>

      <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15, duration: 0.6 }}>
        <motion.div className="portrait-card" animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
          <img src="/portfolio/dinesh-kumar.jpg" alt="Dinesh Kumar portrait" />
        </motion.div>
        <motion.div className="floating-badge badge-one" animate={{ y: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
          <strong>Web Developer</strong>
          <span>React & Python</span>
        </motion.div>
        <motion.div className="floating-badge badge-two" animate={{ y: [0, -7, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}>
          <MapPin size={17} />
          <span>Based in Tamil Nadu</span>
        </motion.div>
        <motion.div className="floating-badge badge-three" animate={{ y: [0, 6, 0] }} transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut' }}>
          <strong>Available</strong>
          <span>For freelance projects</span>
        </motion.div>
      </motion.div>
    </section>
  )
}

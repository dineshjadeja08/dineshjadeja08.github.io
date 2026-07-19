import { motion } from 'framer-motion'
import { services } from '../data/services'
import { SectionHeading } from '../components/SectionHeading'

export function ServicesSection() {
  return (
    <section className="services-section" id="services">
      <SectionHeading label="What I Do" title="Services I Offer" />
      <div className="service-grid">
        {services.map(({ title, description, Icon, tone }, index) => (
          <motion.article
            className="service-card"
            key={title}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: index * 0.04 }}
            whileHover={{ y: -6 }}
          >
            <span className={`service-icon ${tone}`}><Icon size={22} /></span>
            <h3>{title}</h3>
            <p>{description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

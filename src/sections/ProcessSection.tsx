import { motion } from 'framer-motion'
import { SectionHeading } from '../components/SectionHeading'
import { processSteps } from '../data/process'

export function ProcessSection() {
  return (
    <section className="process-section" id="process">
      <SectionHeading label="My Process" title="A simple process from idea to launch" />
      <div className="process-track">
        <motion.div className="process-connector" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: 'easeOut' }} />
        {processSteps.map(({ title, description, Icon }, index) => (
          <motion.article key={title} className="process-step" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
            <span><Icon size={23} /></span>
            <strong>{String(index + 1).padStart(2, '0')}</strong>
            <h3>{title}</h3>
            <p>{description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'

const points = [
  'Clean and modern user interfaces',
  'Mobile-first responsive design',
  'Backend API development',
  'Database and authentication setup',
  'Deployment and ongoing support',
]

export function AboutSection() {
  return (
    <section className="about-section" id="about">
      <motion.img
        className="about-photo"
        src="/portfolio/dinesh-kumar.jpg"
        alt="Dinesh Kumar working on a laptop"
        loading="lazy"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
      />
      <motion.div className="about-copy" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}>
        <span className="section-kicker">About Me</span>
        <h2>I turn business ideas into practical digital products.</h2>
        <p>I am a web developer from Tamil Nadu with experience building websites, backend APIs, dashboards and software products.</p>
        <p>I work mainly with React, TypeScript, Python, Django, Supabase and PostgreSQL.</p>
        <p>
          I enjoy helping businesses move from an idea to a working digital product. My focus is on clean design, mobile responsiveness and simple user experiences.
        </p>
        <p>I have worked on client websites, SaaS platforms, e-commerce concepts, CRM systems and backend APIs.</p>
        <ul>
          {points.map((point) => <li key={point}><Check size={17} /> {point}</li>)}
        </ul>
        <a className="dark-button" href="#experience">More About Me <ArrowRight size={17} /></a>
      </motion.div>
    </section>
  )
}

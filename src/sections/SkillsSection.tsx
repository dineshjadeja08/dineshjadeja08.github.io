import { motion } from 'framer-motion'
import { SectionHeading } from '../components/SectionHeading'
import { skillGroups } from '../data/skills'

export function SkillsSection() {
  return (
    <section className="skills-section" id="skills">
      <SectionHeading label="My Skills" title="Tools and technologies I work with" />
      <div className="skills-grid">
        {skillGroups.map((group, index) => (
          <motion.article key={group.category} className="skill-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
            <h3>{group.category}</h3>
            <div>
              {group.skills.map((skill) => <span key={skill}>{skill}</span>)}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

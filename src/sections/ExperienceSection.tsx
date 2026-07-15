import { BriefcaseBusiness, GraduationCap } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'
import { education, experience } from '../data/experience'

export function ExperienceSection() {
  return (
    <section className="experience-section" id="experience">
      <SectionHeading label="Experience" title="Practical learning and backend experience" />
      <div className="experience-grid">
        {experience.map((item) => (
          <article className="timeline-card" key={`${item.role}-${item.company}`}>
            <BriefcaseBusiness size={22} />
            <span>{item.period}</span>
            <h3>{item.role}</h3>
            <strong>{item.company}</strong>
            <p>{item.details}</p>
          </article>
        ))}
        <article className="timeline-card education-card">
          <GraduationCap size={22} />
          <span>{education.period}</span>
          <h3>{education.degree}</h3>
          <strong>{education.institution}</strong>
        </article>
      </div>
    </section>
  )
}

import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ProjectCard } from '../components/ProjectCard'
import { SectionHeading } from '../components/SectionHeading'
import { featuredProjects } from '../data/projects'

export function WorkSection() {
  return (
    <section className="work-section" id="work">
      <SectionHeading
        label="My Work"
        title="Selected projects I have built"
        action={<Link className="text-link" to="/projects">View All Projects <ArrowRight size={16} /></Link>}
      />
      <div className="project-grid featured-project-grid">
        {featuredProjects.map((project) => <ProjectCard key={project.slug} project={project} large />)}
      </div>
    </section>
  )
}

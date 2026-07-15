import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ProjectCard } from '../components/ProjectCard'
import { projects } from '../data/projects'

export function ProjectsPage() {
  return (
    <main className="page-shell">
      <section className="projects-page-hero">
        <Link className="back-link" to="/"><ArrowLeft size={17} /> Back Home</Link>
        <span className="section-kicker">My Work</span>
        <h1>All selected projects</h1>
        <p>Websites, SaaS concepts, e-commerce systems, CRM tools and backend APIs I have built or developed as practical product work.</p>
      </section>
      <section className="all-project-grid">
        {projects.map((project) => <ProjectCard key={project.slug} project={project} large />)}
      </section>
    </main>
  )
}

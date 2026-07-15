import { ArrowLeft, ExternalLink } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { projects } from '../data/projects'

export function ProjectDetailPage() {
  const { slug } = useParams()
  const project = projects.find((item) => item.slug === slug)

  if (!project) return <Navigate to="/projects" replace />

  return (
    <main className="page-shell">
      <section className="project-detail">
        <Link className="back-link" to="/projects"><ArrowLeft size={17} /> All Projects</Link>
        <div className="project-detail-grid">
          <div>
            <span className="section-kicker">{project.category}</span>
            <h1>{project.name}</h1>
            <p>{project.description}</p>
            {project.role && <p><strong>My role:</strong> {project.role}</p>}
            {project.status && <p><strong>Status:</strong> {project.status}</p>}
            <div className="tag-row">
              {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            {project.liveUrl && (
              <a className="primary-button detail-live-link" href={project.liveUrl} target="_blank" rel="noreferrer">
                Live Website <ExternalLink size={16} />
              </a>
            )}
          </div>
          <img src={project.image} alt={`${project.name} project preview`} />
        </div>
        {project.features && (
          <div className="feature-list">
            <h2>Key features</h2>
            {project.features.map((feature) => <span key={feature}>{feature}</span>)}
          </div>
        )}
      </section>
    </main>
  )
}

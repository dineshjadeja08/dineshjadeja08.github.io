import { ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Project } from '../data/projects'

type ProjectCardProps = {
  project: Project
  large?: boolean
}

export function ProjectCard({ project, large = false }: ProjectCardProps) {
  return (
    <article className={`project-card ${large ? 'large-project-card' : ''}`}>
      <div className="project-image-wrap">
        <img src={project.image} alt={`${project.name} project preview`} loading="lazy" />
      </div>
      <div className="project-card-body">
        <span className="project-category">{project.category}</span>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <div className="tag-row">
          {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        <div className="project-actions">
          {project.liveUrl ? (
            <a href={project.liveUrl} target="_blank" rel="noreferrer">
              Live Website <ExternalLink size={16} />
            </a>
          ) : (
            <span>{project.status || 'Details available on request'}</span>
          )}
          <Link to={`/projects/${project.slug}`}>Details</Link>
        </div>
      </div>
    </article>
  )
}

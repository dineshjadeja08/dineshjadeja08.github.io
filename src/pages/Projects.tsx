import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { projects } from '../data/projects';
import { siteConfig } from '../config/site';
import SEO from '../components/common/SEO';
import Image from '../components/common/Image';
import { trackEvent } from '../lib/analytics';

const filters = ['All', 'Websites', 'E-Commerce', 'SaaS', 'Backend'] as const;
type ProjectFilter = typeof filters[number];

const matchesFilter = (category: string, filter: ProjectFilter) => {
  const normalized = category.toLowerCase();
  if (filter === 'All') return true;
  if (filter === 'Websites') return normalized.includes('website');
  if (filter === 'E-Commerce') return normalized.includes('e-commerce') || normalized.includes('commerce');
  if (filter === 'SaaS') return normalized.includes('saas');
  return normalized.includes('backend') || normalized.includes('crm');
};

export const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('All');
  const filteredProjects = useMemo(
    () => projects.filter((project) => matchesFilter(project.category, activeFilter)),
    [activeFilter]
  );

  const pageSchema = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Dinesh Kumar's Web Development Projects",
      "description": "Portfolio of web sites, custom software dashboards, e-commerce storefronts, and backend REST APIs built by Dinesh Kumar.",
      "url": `${siteConfig.url}/projects`
    }
  ];

  return (
    <div className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <SEO 
        title="Portfolio &amp; Case Studies"
        description="Explore conversion-focused websites, SaaS MVPs, e-commerce stores and backend systems created to solve business problems."
        canonicalPath="/projects"
        schema={pageSchema}
      />

      {/* Header */}
      <div className="max-w-3xl mb-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-brand-peach block mb-3">
          SELECTED WORK
        </span>
        <h1 className="font-heading font-extrabold text-4xl md:text-5xl text-brand-text mb-6">
          Projects built to earn trust, explain offers and generate action
        </h1>
        <p className="text-brand-muted text-base md:text-lg leading-relaxed">
          Each project is shaped around a business goal: more enquiries, clearer product flows, easier management or a stronger digital presence.
        </p>
      </div>

      <div className="project-filter-tabs" aria-label="Project filters">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={activeFilter === filter ? 'is-active' : ''}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {filteredProjects.map((project) => (
          <article 
            key={project.slug}
            className="project-list-card bg-brand-card border border-brand-border rounded-brand-lg overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all duration-300 group"
          >
            {/* Image Container with Zoom effect */}
            <div className="relative overflow-hidden aspect-[16/10] bg-brand-secondary border-b border-brand-border">
              <Link 
                to={`/projects/${project.slug}`}
                onClick={() => trackEvent('project_case_study_opened', { slug: project.slug, source: 'work_list' })}
              >
                <Image
                  src={project.image}
                  alt={`Mockup screenshot of project ${project.name}`}
                  fallbackType="project"
                  fallbackText={project.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
              
              {/* Status Badge */}
              <div className="absolute top-4 left-4">
                <span className="text-[10px] font-bold uppercase tracking-widest bg-brand-bg/90 backdrop-blur-xs text-brand-text border border-brand-border px-2.5 py-1 rounded-brand-pill shadow-xs">
                  {project.status}
                </span>
              </div>
            </div>

            {/* Project Copy */}
            <div className="p-6 md:p-8 flex-grow flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-peach block mb-2">
                  {project.category}
                </span>
                
                <h2 className="font-heading font-extrabold text-xl md:text-2xl text-brand-text mb-3 group-hover:text-brand-peach transition-colors duration-200">
                  <Link 
                    to={`/projects/${project.slug}`}
                    onClick={() => trackEvent('project_case_study_opened', { slug: project.slug, source: 'work_list_title' })}
                  >
                    {project.name}
                  </Link>
                </h2>
                
                <p className="text-brand-muted text-sm leading-relaxed mb-6 line-clamp-3">
                  {project.conversionGoal || project.description}
                </p>
                {project.resultMetric && (
                  <div className="mb-6 text-xs font-extrabold text-brand-text bg-brand-soft-peach/70 border border-brand-border px-3 py-2 rounded-brand-sm">
                    Result: {project.resultMetric}
                  </div>
                )}

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech} 
                      className="text-xs bg-brand-secondary border border-brand-border text-brand-muted px-2.5 py-1 rounded-brand-pill font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-4 border-t border-brand-border pt-6">
                <Link
                  to={`/projects/${project.slug}`}
                  onClick={() => trackEvent('project_case_study_opened', { slug: project.slug, source: 'work_list_btn' })}
                  className="inline-flex items-center text-sm font-semibold text-brand-text hover:text-brand-peach transition-colors duration-200"
                >
                  <span>Read Case Study</span>
                  <ArrowRight className="w-4 h-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('project_live_link_clicked', { slug: project.slug })}
                    className="inline-flex items-center text-sm font-semibold text-brand-peach hover:underline"
                  >
                    <span>Visit Live Site</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-1" />
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Projects;

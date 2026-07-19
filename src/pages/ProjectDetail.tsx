import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { projects } from '../data/projects';
import { siteConfig } from '../config/site';
import SEO from '../components/common/SEO';
import Image from '../components/common/Image';
import BookCallButton from '../components/booking/BookCallButton';
import { trackEvent } from '../lib/analytics';

export const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const currentIdx = projects.findIndex(p => p.slug === slug);

  // If project not found, redirect to 404 page
  if (currentIdx === -1) {
    return <Navigate to="/404" replace />;
  }

  const project = projects[currentIdx];

  // Pagination with wrap-around
  const prevProject = projects[currentIdx - 1] || projects[projects.length - 1];
  const nextProject = projects[currentIdx + 1] || projects[0];

  const pageSchema = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": siteConfig.url
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Projects",
          "item": `${siteConfig.url}/projects`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": project.name,
          "item": `${siteConfig.url}/projects/${project.slug}`
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "name": project.name,
      "description": project.description,
      "genre": project.category,
      "creator": {
        "@type": "Person",
        "name": siteConfig.fullName
      }
    }
  ];

  return (
    <div className="py-16 md:py-24 max-w-5xl mx-auto px-6 md:px-12 space-y-16">
      <SEO
        title={`${project.name} | Case Study`}
        description={project.description}
        canonicalPath={`/projects/${project.slug}`}
        schema={pageSchema}
      />

      {/* Back button */}
      <div>
        <Link
          to="/projects"
          className="inline-flex items-center text-sm font-semibold text-brand-muted hover:text-brand-text transition-colors duration-150"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span>Back to All Projects</span>
        </Link>
      </div>

      {/* Hero Header */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-peach">
            {project.category}
          </span>
          <span className="w-1 h-1 bg-brand-border rounded-full" />
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-muted">
            Status: {project.status}
          </span>
        </div>

        <h1 className="font-heading font-extrabold text-4xl md:text-5xl text-brand-text leading-tight">
          {project.name}
        </h1>

        <p className="text-brand-muted text-base md:text-lg leading-relaxed max-w-3xl">
          {project.conversionGoal || project.description}
        </p>
      </div>

      {/* Case Study Feature Image */}
      <div className="aspect-[16/9] w-full rounded-brand-lg overflow-hidden border border-brand-border bg-white shadow-xs">
        <Image
          src={project.image}
          alt={`Interactive interface mockup screenshot of ${project.name}`}
          fallbackType="project"
          fallbackText={project.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-brand-card border border-brand-border rounded-brand-md p-5">
          <h4 className="text-xs font-bold uppercase tracking-widest text-brand-text mb-2">
            Business Objective
          </h4>
          <p className="text-sm text-brand-muted leading-relaxed">
            {project.conversionGoal || project.problem}
          </p>
        </div>
        <div className="bg-brand-card border border-brand-border rounded-brand-md p-5">
          <h4 className="text-xs font-bold uppercase tracking-widest text-brand-text mb-2">
            Conversion Outcome
          </h4>
          <p className="text-sm text-brand-muted leading-relaxed">
            {project.resultMetric || project.outcome || project.solution}
          </p>
        </div>
      </div>

      {/* Meta Specs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-y border-brand-border">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-brand-text mb-3">
            My Roles &amp; Responsibilities
          </h4>
          <ul className="space-y-1.5 text-sm text-brand-muted">
            {project.role.map((r, i) => (
              <li key={i} className="flex items-center">
                <span className="w-1.5 h-1.5 bg-brand-peach rounded-full mr-2 shrink-0" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-brand-text mb-3">
            Technologies Utilized
          </h4>
          <div className="flex flex-wrap gap-2">
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

        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-brand-text mb-3">
            Project Delivery
          </h4>
          <div className="space-y-4">
            <span className="inline-flex items-center text-xs font-semibold bg-brand-soft-peach text-brand-text px-2.5 py-1 rounded-brand-pill border border-brand-border">
              {project.status === "Live" || project.status === "Live MVP" ? "Production Release" : "Development Phase"}
            </span>
            {project.liveUrl && (
              <div className="pt-2">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('project_live_link_clicked', { slug: project.slug })}
                  className="inline-flex items-center text-sm font-semibold text-brand-peach hover:underline"
                >
                  <span>Visit Live Project</span>
                  <ExternalLink className="w-4 h-4 ml-1.5" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Narrative Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        <div className="md:col-span-8 space-y-10 text-brand-text leading-relaxed">
          {/* Problem */}
          <section className="space-y-3">
            <h2 className="font-heading font-extrabold text-2xl text-brand-text">
              The Problem
            </h2>
            <p className="text-brand-muted text-sm md:text-base leading-relaxed">
              {project.problem}
            </p>
          </section>

          {/* Solution */}
          <section className="space-y-3">
            <h2 className="font-heading font-extrabold text-2xl text-brand-text">
              The Solution
            </h2>
            <p className="text-brand-muted text-sm md:text-base leading-relaxed">
              {project.solution}
            </p>
          </section>

          {/* Core Features list if configured */}
          {project.features && project.features.length > 0 && (
            <section className="space-y-3">
              <h2 className="font-heading font-extrabold text-2xl text-brand-text">
                Key Features Implemented
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-brand-muted">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-brand-peach rounded-full mr-2.5 shrink-0 mt-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Challenges */}
          {project.challenges && (
            <section className="space-y-3">
              <h2 className="font-heading font-extrabold text-2xl text-brand-text">
                Development Challenges
              </h2>
              <p className="text-brand-muted text-sm md:text-base leading-relaxed">
                {project.challenges}
              </p>
            </section>
          )}

          {/* Outcome */}
          {project.outcome && (
            <section className="space-y-3">
              <h2 className="font-heading font-extrabold text-2xl text-brand-text">
                Project Outcome
              </h2>
              <p className="text-brand-muted text-sm md:text-base leading-relaxed">
                {project.outcome}
              </p>
            </section>
          )}
        </div>

        {/* Sidebar Call to Action details */}
        <div className="md:col-span-4 bg-brand-card border border-brand-border rounded-brand-md p-6 h-fit space-y-6">
          <h3 className="font-heading font-bold text-lg text-brand-text">
            Want a result like this?
          </h3>
          <p className="text-brand-muted text-xs leading-relaxed">
            Let’s review your offer, target customers and the enquiry path your website should create.
          </p>
          <div>
            <BookCallButton
              type="selector"
              label="Discuss Similar Project"
              className="w-full py-3 bg-brand-text hover:bg-brand-peach text-white font-heading font-bold rounded-brand-sm text-sm"
            />
          </div>
        </div>
      </div>

      {/* Prev/Next Case Study Navigation */}
      <div className="border-t border-brand-border pt-12 flex items-center justify-between">
        <Link
          to={`/projects/${prevProject.slug}`}
          onClick={() => trackEvent('project_case_study_opened', { slug: prevProject.slug, source: 'pagination_prev' })}
          className="group flex flex-col text-left max-w-[45%]"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-1 flex items-center">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            <span>Previous</span>
          </span>
          <span className="font-heading font-bold text-sm md:text-base text-brand-text group-hover:text-brand-peach transition-colors duration-150 truncate">
            {prevProject.name}
          </span>
        </Link>

        <Link
          to={`/projects/${nextProject.slug}`}
          onClick={() => trackEvent('project_case_study_opened', { slug: nextProject.slug, source: 'pagination_next' })}
          className="group flex flex-col text-right max-w-[45%] items-end"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-1 flex items-center">
            <span>Next</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </span>
          <span className="font-heading font-bold text-sm md:text-base text-brand-text group-hover:text-brand-peach transition-colors duration-150 truncate">
            {nextProject.name}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default ProjectDetail;

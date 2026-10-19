import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Calendar,
  CheckCircle2,
  Code2,
  Database,
  ExternalLink,
  Globe2,
  LayoutTemplate,
  Mail,
  MapPin,
  PenTool,
  Rocket,
  ShoppingCart,
  TestTubeDiagonal
} from 'lucide-react';
import { Link } from 'react-router-dom';
import portrait from '../assets/images/dinesh-portrait.jpg';
import SEO from '../components/common/SEO';
import { siteConfig } from '../config/site';
import { projects } from '../data/projects';
import { faqs } from '../data/faqs';
import { processSteps } from '../data/process';
import { services } from '../data/services';
import { useBooking } from '../hooks/useBooking';
import { trackEvent } from '../lib/analytics';

const serviceIcons = [Globe2, Rocket, ShoppingCart, PenTool, Code2, Database];
const serviceIconClasses = [
  'bg-[#e9f2ff] text-[#2563eb]',
  'bg-[#fff0ec] text-[#f15a2b]',
  'bg-[#f5eaff] text-[#8b5cf6]',
  'bg-[#eaf8e7] text-[#289344]',
  'bg-[#eaf2ff] text-[#2670df]',
  'bg-[#fff3db] text-[#c98212]'
];
const processIcons = [BriefcaseBusiness, LayoutTemplate, PenTool, Code2, TestTubeDiagonal, Rocket];
const projectOrder = ['grf-growths', 'cavve', 'linksync', 'clientease-crm'];
export const Home = () => {
  const { openBooking } = useBooking();
  const featuredProjects = projects
    .filter((project) => project.featured)
    .sort((a, b) => projectOrder.indexOf(a.slug) - projectOrder.indexOf(b.slug))
    .slice(0, 4);

  const handleBookClick = (source: string) => {
    trackEvent('booking_modal_opened', { source });
    openBooking();
  };

  const homepageSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Dinesh Kumar Portfolio',
      url: siteConfig.url,
      description: siteConfig.description
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: siteConfig.fullName,
      jobTitle: siteConfig.title,
      url: siteConfig.url,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Tirupattur',
        addressRegion: 'Tamil Nadu',
        addressCountry: 'India'
      }
    }
  ];

  return (
    <div className="home-shell">
      <SEO
        title="Dinesh Kumar | Freelance Software Engineer"
        description="Independent software engineer from Tamil Nadu designing thoughtful websites, web applications and practical digital products."
        canonicalPath="/"
        schema={homepageSchema}
      />

      <section className="site-container hero-section">
        <div className="hero-copy">
          <div className="intro-pill">
            <span className="availability-dot" aria-hidden="true" />
            <span>Available for select freelance projects</span>
          </div>

          <h1>
            I design and build
            <span>thoughtful digital products</span>
            for ambitious ideas.
          </h1>

          <p>
            I’m Dinesh, an independent software engineer from Tamil Nadu. I turn ideas
            into clear, responsive websites and practical web applications using
            React, TypeScript and Python.
          </p>

          <div className="hero-actions">
            <button type="button" className="btn btn-dark" onClick={() => handleBookClick('hero')}>
              <Calendar size={16} />
              <span>Start a Project</span>
            </button>
            <a href="#work" className="btn btn-light">
              <span>View My Work</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

        <div className="hero-visual" aria-label="Dinesh Kumar profile highlight">
          <div className="hero-dots" />
          <img src={portrait} alt="Dinesh Kumar" className="hero-portrait" />
          <div className="profile-location">
            <MapPin size={15} />
            <span>Tirupattur, Tamil Nadu</span>
          </div>
          <div className="profile-caption">
            <strong>Dinesh Kumar</strong>
            <span>Software Engineer &amp; Digital Product Builder</span>
          </div>
        </div>

        <div className="trust-strip">
          <div><Globe2 size={15} />Business websites</div>
          <div><LayoutTemplate size={15} />SaaS &amp; dashboards</div>
          <div><ShoppingCart size={15} />E-commerce</div>
          <div><Database size={15} />APIs &amp; integrations</div>
        </div>
      </section>

      <section id="about" className="site-container about-services-grid scroll-mt-24">
        <div className="about-panel">
          <img src={portrait} alt="Dinesh Kumar working" />
          <div className="about-copy">
            <span className="section-kicker">About Me</span>
            <h2>A developer who cares about how the whole product feels.</h2>
            <p>
              I work directly with founders and business owners, from the first idea
              to the final deployment. I care about clear interfaces, useful features
              and code that stays understandable after launch.
            </p>
            <ul className="check-list">
              <li><CheckCircle2 size={17} />One-to-one collaboration</li>
              <li><CheckCircle2 size={17} />Design and development together</li>
              <li><CheckCircle2 size={17} />Practical launch support</li>
            </ul>
            <Link to="/about" className="btn btn-dark about-btn">
              <span>More About Me</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        <div id="services" className="services-panel scroll-mt-24">
          <div className="section-head">
            <div>
              <span className="section-kicker">What I Do</span>
              <h2>What I can build with you</h2>
            </div>
            <button type="button" onClick={() => handleBookClick('services_link')}>
              Discuss a Project
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="service-grid">
            {services.map((service, index) => {
              const Icon = serviceIcons[index] ?? BadgeCheck;

              return (
                <article className="service-card" key={service.id}>
                  <span className={`service-icon ${serviceIconClasses[index] ?? serviceIconClasses[0]}`}>
                    <Icon size={22} />
                  </span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="work" className="site-container projects-section scroll-mt-24">
        <div className="section-head">
          <div>
            <span className="section-kicker">My Work</span>
            <h2>A selection of products I’ve built</h2>
          </div>
          <Link to="/projects" onClick={() => trackEvent('projects_view_all_clicked')}>
            View All Projects
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="project-grid">
          {featuredProjects.map((project, index) => (
            <article className="project-card" key={project.slug}>
              <Link
                to={`/projects/${project.slug}`}
                className={`project-thumb project-thumb-${index + 1}`}
                onClick={() => trackEvent('project_case_study_opened', { slug: project.slug, source: 'home_featured' })}
              >
                <img src={project.image} alt={`${project.name} preview`} />
              </Link>
              <div className="project-body">
                <div>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                </div>
                <div className="project-foot">
                  <div>
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open live link of ${project.name}`}
                      onClick={() => trackEvent('project_live_link_clicked', { slug: project.slug })}
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="process" className="site-container process-cta-grid scroll-mt-24">
        <div className="process-panel">
            <span className="section-kicker">My Process</span>
          <h2>A clear process from idea to launch</h2>
          <div className="process-track">
            {processSteps.map((step, index) => {
              const Icon = processIcons[index] ?? BadgeCheck;

              return (
                <div className="process-step" key={step.number}>
                  <span>
                    <Icon size={23} />
                  </span>
                  <strong>{step.number}</strong>
                  <p>{step.title.replace('Design Direction', 'Design').replace('Testing & Review', 'Test').replace('Launch & Support', 'Launch')}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="cta-panel">
          <div>
            <span>Let's Work Together</span>
            <h2>Have a project in mind?</h2>
            <p>
              Tell me about your idea. I’ll help you clarify the right solution,
              a realistic timeline and the next useful step.
            </p>
            <button type="button" className="btn btn-white" onClick={() => handleBookClick('bottom_cta')}>
              <Calendar size={16} />
              <span>Book a Free Call</span>
            </button>
          </div>
          <div className="calendar-art" aria-hidden="true">
            <div className="calendar-card">
              {Array.from({ length: 9 }).map((_, index) => <span key={index} />)}
            </div>
            <div className="clock-face">
              <i />
              <b />
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="site-container faq-contact-grid scroll-mt-24">
        <div className="faq-panel">
          <span className="section-kicker">FAQ</span>
          <h2>Questions before starting?</h2>
          <div className="faq-list">
            {faqs.slice(0, 4).map((faq) => (
              <article key={faq.id}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>

        <div id="contact" className="contact-panel scroll-mt-24">
          <span className="section-kicker">Contact</span>
          <h2>Tell me what you’re building.</h2>
          <p>
            Share your idea, current website or product challenge. I’ll review it
            personally and reply with a practical next step.
          </p>
          <div className="contact-actions">
            <Link to="/contact" className="btn btn-dark">
              <Mail size={16} />
              <span>Send Enquiry</span>
            </Link>
            <button type="button" className="btn btn-light" onClick={() => handleBookClick('contact_section')}>
              <Calendar size={16} />
              <span>Book a Free Call</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

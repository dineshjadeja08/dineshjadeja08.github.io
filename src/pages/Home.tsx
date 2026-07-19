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
  PenTool,
  Rocket,
  Search,
  ShoppingCart,
  Smartphone,
  Star,
  TestTubeDiagonal,
  Zap
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import portrait from '../assets/images/dinesh-portrait.jpg';
import cavveThumb from '../assets/images/reference/project-cavve.png';
import grfThumb from '../assets/images/reference/project-grf.png';
import linksyncThumb from '../assets/images/reference/project-linksync.png';
import xenfirmThumb from '../assets/images/reference/project-xenfirm.png';
import SEO from '../components/common/SEO';
import { siteConfig } from '../config/site';
import { projects } from '../data/projects';
import { faqs } from '../data/faqs';
import { processSteps } from '../data/process';
import { services } from '../data/services';
import { testimonials } from '../data/testimonials';
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
const projectOrder = ['grf-growths', 'cavve', 'linksync', 'xenfirm'];
const projectThumbs: Record<string, string> = {
  'grf-growths': grfThumb,
  cavve: cavveThumb,
  linksync: linksyncThumb,
  xenfirm: xenfirmThumb
};
const pricingPackages = [
  {
    name: 'Starter Website',
    price: 'From ₹10k',
    description: 'For businesses that need a credible first impression and a direct enquiry path.',
    features: ['Outcome-focused homepage', 'Responsive layout', 'Contact or WhatsApp CTA']
  },
  {
    name: 'Business Growth',
    price: 'From ₹25k',
    description: 'For brands that want service pages, trust sections and a stronger lead-generation flow.',
    features: ['5-8 conversion sections', 'Proof and FAQ blocks', 'SEO-ready page structure'],
    featured: true
  },
  {
    name: 'Custom Product',
    price: 'Custom',
    description: 'For SaaS MVPs, dashboards, e-commerce flows and backend systems that support growth.',
    features: ['Auth and database flows', 'Admin/dashboard UI', 'API or deployment support']
  }
];

export const Home = () => {
  const { openBooking } = useBooking();
  const [currentReview, setCurrentReview] = useState(0);
  const featuredProjects = projects
    .filter((project) => project.featured)
    .sort((a, b) => projectOrder.indexOf(a.slug) - projectOrder.indexOf(b.slug))
    .slice(0, 4);

  const handleBookClick = (source: string) => {
    trackEvent('booking_modal_opened', { source });
    openBooking();
  };

  const activeTestimonial = testimonials[currentReview];
  const nextReview = () => {
    setCurrentReview((current) => (current + 1) % testimonials.length);
  };
  const prevReview = () => {
    setCurrentReview((current) => (current - 1 + testimonials.length) % testimonials.length);
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
        title="Dinesh Kumar | Conversion-Focused Freelance Web Developer"
        description="Conversion-focused freelance web developer building fast websites, landing pages and web apps that help businesses earn trust and generate enquiries."
        canonicalPath="/"
        schema={homepageSchema}
      />

      <section className="site-container hero-section">
        <div className="hero-copy">
          <div className="intro-pill">
            <span>👋</span>
            <span>Available for conversion-focused websites</span>
          </div>

          <h1>
            I build websites that
            <span>turn visitors into leads</span>
            for growing businesses.
          </h1>

          <p>
            I design and develop fast, trustworthy websites with clear messaging,
            proof sections and enquiry flows that help clients take action.
          </p>

          <div className="hero-actions">
            <button type="button" className="btn btn-dark" onClick={() => handleBookClick('hero')}>
              <Calendar size={16} />
              <span>Book a Free Strategy Call</span>
            </button>
            <a href="#work" className="btn btn-light">
              <span>View My Work</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

        <div className="hero-visual" aria-label="Dinesh Kumar profile highlight">
          <div className="hero-dots" />
          <div className="curved-arrow" aria-hidden="true">
            <svg viewBox="0 0 130 78" role="img">
              <path d="M118 18C82 4 43 23 20 58" />
              <path d="M101 12l18 7-10 14" />
            </svg>
          </div>
          <img src={portrait} alt="Dinesh Kumar" className="hero-portrait" />

          <div className="floating-stat stat-top">
            <strong>5+</strong>
            <span>Projects<br />Completed</span>
          </div>
          <div className="floating-stat stat-left">
            <strong>100%</strong>
            <span>Lead-Focused<br />Builds</span>
          </div>
          <div className="floating-stat stat-right">
            <strong>2+</strong>
            <span>Years of<br />Experience</span>
          </div>
          <div className="client-badge">
            <div className="avatar-stack">
              <span>R</span>
              <span>A</span>
            </div>
            <div>
              <strong>Happy Clients</strong>
              <div className="rating-row">
                <Star size={11} fill="currentColor" />
                <Star size={11} fill="currentColor" />
                <Star size={11} fill="currentColor" />
                <Star size={11} fill="currentColor" />
                <Star size={11} fill="currentColor" />
                <span>5.0</span>
              </div>
            </div>
          </div>
        </div>

        <div className="trust-strip">
          <div><Zap size={15} />Fast Launch</div>
          <div><Code2 size={15} />Clean Build</div>
          <div><Search size={15} />SEO Ready</div>
          <div><Smartphone size={15} />Mobile First</div>
        </div>
      </section>

      <section id="about" className="site-container about-services-grid scroll-mt-24">
        <div className="about-panel">
          <img src={portrait} alt="Dinesh Kumar working" />
          <div className="about-copy">
            <span className="section-kicker">About Me</span>
            <h2>Building websites around trust, clarity and enquiries.</h2>
            <p>
              I help business owners turn their offer into a clean online experience:
              clear copy, useful sections, fast performance and calls-to-action that
              make it easy for customers to enquire.
            </p>
            <ul className="check-list">
              <li><CheckCircle2 size={17} />Clear Service Positioning</li>
              <li><CheckCircle2 size={17} />Trust-Building Page Structure</li>
              <li><CheckCircle2 size={17} />Enquiry-Focused CTAs</li>
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
              <h2>Conversion-focused services</h2>
            </div>
            <button type="button" onClick={() => handleBookClick('services_link')}>
              Plan My Website
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
            <h2>Projects built to solve business problems</h2>
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
                <img src={projectThumbs[project.slug]} alt={`${project.name} preview`} />
              </Link>
              <div className="project-body">
                <div>
                  <h3>{project.name}</h3>
                  <p>{project.conversionGoal || project.description}</p>
                  {project.resultMetric && <strong className="project-result">{project.resultMetric}</strong>}
                </div>
                <div className="project-foot">
                  <div>
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech}>{tech.replace('TypeScript', 'Tailwind')}</span>
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

      <section id="reviews" className="site-container reviews-section scroll-mt-24">
        <div className="section-head">
          <div>
            <span className="section-kicker">Client Reviews</span>
            <h2>Proof that the process feels clear and reliable</h2>
          </div>
        </div>

        <div className="reviews-wrap">
          <button type="button" className="review-nav" aria-label="Previous testimonial" onClick={prevReview}>
            <ArrowRight size={17} className="rotate-180" />
          </button>
          <article className="review-card review-card-single" key={activeTestimonial.id}>
            <div className="review-top">
              <span className="review-avatar">{activeTestimonial.name[0]}</span>
              <div className="stars">
                {Array.from({ length: activeTestimonial.rating }).map((_, index) => (
                  <Star key={index} size={15} fill="currentColor" />
                ))}
              </div>
            </div>
            <p>"{activeTestimonial.content}"</p>
            <h3>{activeTestimonial.name}</h3>
            <span>{activeTestimonial.company}</span>
          </article>
          <button type="button" className="review-nav" aria-label="Next testimonial" onClick={nextReview}>
            <ArrowRight size={17} />
          </button>
        </div>
        <div className="review-dots" aria-hidden="true">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              type="button"
              className={index === currentReview ? 'is-active' : ''}
              onClick={() => setCurrentReview(index)}
              aria-label={`Show review from ${testimonial.name}`}
            />
          ))}
        </div>
      </section>

      <section id="pricing" className="site-container pricing-section scroll-mt-24">
        <div className="section-head">
          <div>
            <span className="section-kicker">Pricing</span>
            <h2>Packages based on where your business is now</h2>
          </div>
          <button type="button" onClick={() => handleBookClick('pricing_section')}>
            Get My Quote
            <ArrowRight size={15} />
          </button>
        </div>

        <div className="pricing-grid">
          {pricingPackages.map((pack) => (
            <article className={`pricing-card ${pack.featured ? 'is-featured' : ''}`} key={pack.name}>
              <div>
                <span>{pack.name}</span>
                <strong>{pack.price}</strong>
                <p>{pack.description}</p>
              </div>
              <ul>
                {pack.features.map((feature) => (
                  <li key={feature}>
                    <CheckCircle2 size={16} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button type="button" className={pack.featured ? 'btn btn-dark' : 'btn btn-light'} onClick={() => handleBookClick(`pricing_${pack.name}`)}>
                <Calendar size={15} />
                <span>Discuss Package</span>
              </button>
            </article>
          ))}
        </div>
      </section>

      <section id="process" className="site-container process-cta-grid scroll-mt-24">
        <div className="process-panel">
            <span className="section-kicker">My Process</span>
          <h2>A simple process from offer to launch</h2>
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
            <h2>Want a website that helps customers choose you?</h2>
            <p>
              Book a free 30-min call and we’ll map your offer, target customer,
              key pages and the fastest path to launch.
            </p>
            <button type="button" className="btn btn-white" onClick={() => handleBookClick('bottom_cta')}>
              <Calendar size={16} />
              <span>Book a Strategy Call</span>
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
          <h2>Questions before starting a lead-focused website</h2>
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
          <h2>Ready to turn your website into a sales asset?</h2>
          <p>
            Send your offer, current website problem and goals. I’ll review it and
            suggest the clearest next step for more trust and better enquiries.
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

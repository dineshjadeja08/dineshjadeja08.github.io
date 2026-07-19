import { siteConfig } from '../config/site';
import { experiences, education } from '../data/experience';
import SEO from '../components/common/SEO';
import Image from '../components/common/Image';
import BookCallButton from '../components/booking/BookCallButton';
import { Briefcase, GraduationCap, CheckCircle2 } from 'lucide-react';


export const About = () => {
  const pageSchema = [
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About Dinesh Kumar",
      "description": "Learn about Dinesh Kumar's background as a freelance web developer based in Tirupattur, Tamil Nadu.",
      "url": `${siteConfig.url}/about`
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": siteConfig.fullName,
      "jobTitle": siteConfig.title,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Tirupattur",
        "addressRegion": "Tamil Nadu",
        "addressCountry": "India"
      },
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "Bharathidasan Engineering College"
      }
    }
  ];

  return (
    <div className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto space-y-20">
      <SEO
        title="About Me | Freelance Web Developer"
        description="Learn about Dinesh Kumar, a web developer from Tamil Nadu building fast websites, e-commerce stores, and backend solutions using React and Python."
        canonicalPath="/about"
        schema={pageSchema}
      />

      {/* Main Bio Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Intro Text */}
        <div className="lg:col-span-7 space-y-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-peach block">
            ABOUT DINESH KUMAR
          </span>
          <h1 className="font-heading font-extrabold text-4xl md:text-5xl text-brand-text leading-tight">
            I turn ideas into practical digital products.
          </h1>
          
          <div className="text-brand-muted text-base leading-relaxed space-y-4 font-normal">
            <p>
              I am a Python and web developer with hands-on experience in backend development, APIs, databases and modern frontend applications.
            </p>
            <p>
              I started with Python, Django and REST APIs, then expanded into React, TypeScript, Supabase and product development. Since then, I have worked on business websites, SaaS ideas, e-commerce systems, CRM applications and automation-focused projects.
            </p>
            <p>
              I now use this experience to help businesses and founders build clean, useful and scalable digital products. My focus is on clear user experiences, responsive design, performance and maintainable development.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <span className="inline-flex items-center text-xs font-semibold uppercase tracking-widest text-brand-success bg-[#237A50]/15 px-3 py-1.5 rounded-brand-pill">
              <span className="w-2 h-2 bg-brand-success rounded-full mr-2 animate-pulse"></span>
              {siteConfig.availability}
            </span>
          </div>
        </div>

        {/* Profile Image container */}
        <div className="lg:col-span-5">
          <div className="relative group max-w-sm mx-auto">
            <div className="absolute -inset-2 bg-brand-soft-peach rounded-brand-lg -rotate-3 transition-transform duration-300 group-hover:rotate-0" />
            <Image
              src="/src/assets/images/dinesh-portrait.jpg"
              alt="Dinesh Kumar - Freelance Web Developer"
              fallbackType="portrait"
              className="relative w-full aspect-[4/5] object-cover rounded-brand-lg border border-brand-border bg-white shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Work Principles Section */}
      <div className="border-t border-brand-border pt-16">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-peach block mb-3">
            MY PRINCIPLES
          </span>
          <h2 className="font-heading font-extrabold text-3xl text-brand-text">
            How I approach work and code
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Understand the business",
              desc: "I clarify your commercial goals, target users, and constraints before writing any code."
            },
            {
              title: "Keep it clean & easy",
              desc: "Interfaces should be simple, intuitive, and easy for visitors to navigate without learning curves."
            },
            {
              title: "Mobile-first baseline",
              desc: "More than half of your clients visit from phone displays; I design with responsiveness at the core."
            },
            {
              title: "Honest status updates",
              desc: "You will always know what is complete, what is currently being worked on, and where blocks are."
            },
            {
              title: "Choose practical tech",
              desc: "I select reliable, stable technologies that solve actual problems, instead of chasing industry hype."
            },
            {
              title: "Deployment support",
              desc: "I support you through host setup, domain mapping, form routing, and the final production launch."
            }
          ].map((principle, index) => (
            <div 
              key={index}
              className="bg-brand-card border border-brand-border p-6 rounded-brand-md flex flex-col justify-between"
            >
              <div>
                <div className="p-2.5 bg-brand-soft-peach rounded-brand-sm text-brand-peach w-fit mb-4">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-lg text-brand-text mb-2">
                  {principle.title}
                </h3>
                <p className="text-brand-muted text-sm leading-relaxed">
                  {principle.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience & Education Timelines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 border-t border-brand-border pt-16">
        {/* Work Experience */}
        <div>
          <div className="flex items-center space-x-3 mb-8">
            <Briefcase className="w-6 h-6 text-brand-peach" />
            <h2 className="font-heading font-bold text-2xl text-brand-text">
              Professional Experience
            </h2>
          </div>

          <div className="relative pl-6 border-l border-brand-border space-y-12">
            {experiences.map((exp, idx) => (
              <div key={idx} className="relative">
                {/* Timeline Dot */}
                <div className="absolute -left-[31px] top-1.5 w-[11px] h-[11px] bg-brand-peach border border-brand-bg rounded-full" />
                
                <span className="text-xs font-semibold text-brand-peach block mb-1">
                  {exp.period}
                </span>
                <h3 className="font-heading font-bold text-lg text-brand-text">
                  {exp.role}
                </h3>
                <span className="text-sm font-semibold text-brand-muted block mb-3">
                  {exp.company}
                </span>
                <p className="text-brand-muted text-sm leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <div className="flex items-center space-x-3 mb-8">
            <GraduationCap className="w-6 h-6 text-brand-peach" />
            <h2 className="font-heading font-bold text-2xl text-brand-text">
              Education
            </h2>
          </div>

          <div className="relative pl-6 border-l border-brand-border space-y-12">
            {education.map((edu, idx) => (
              <div key={idx} className="relative">
                {/* Timeline Dot */}
                <div className="absolute -left-[31px] top-1.5 w-[11px] h-[11px] bg-brand-peach border border-brand-bg rounded-full" />
                
                <span className="text-xs font-semibold text-brand-peach block mb-1">
                  {edu.period}
                </span>
                <h3 className="font-heading font-bold text-lg text-brand-text">
                  {edu.degree}
                </h3>
                <span className="text-sm font-semibold text-brand-muted block">
                  {edu.institution}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-brand-dark text-white rounded-brand-lg p-8 md:p-12 text-center max-w-4xl mx-auto space-y-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-brand-peach block">
          LET’S START A CONVERSATION
        </span>
        <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-white">
          Have a project where you need help?
        </h2>
        <p className="text-brand-dark-muted max-w-lg mx-auto text-sm md:text-base leading-relaxed">
          Book a free 30-minute discovery call where we can map out a timeline, scope requirements, and align on budget options.
        </p>
        <div className="pt-4">
          <BookCallButton
            type="selector"
            label="Schedule a Free Discovery Call"
            className="px-8 py-4 bg-brand-peach hover:bg-white text-white hover:text-brand-text font-bold rounded-brand-sm text-base shadow-xs"
          />
        </div>
      </div>
    </div>
  );
};

export default About;

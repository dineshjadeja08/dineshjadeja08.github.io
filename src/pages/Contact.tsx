import { Mail, MessageSquare, MapPin } from 'lucide-react';
import { siteConfig } from '../config/site';
import { bookingLinks } from '../config/booking';
import { getWhatsAppLink } from '../lib/whatsapp';
import { trackEvent } from '../lib/analytics';
import SEO from '../components/common/SEO';
import ContactForm from '../components/forms/ContactForm';
import BookingOptionCard from '../components/booking/BookingOptionCard';

export const Contact = () => {
  const whatsappUrl = getWhatsAppLink("Hi Dinesh, I would like to enquire about your web development services.");
  const email = siteConfig.email;

  const pageSchema = [
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact Dinesh Kumar",
      "description": "Get in touch with Dinesh Kumar, freelance web developer based in Tamil Nadu, India.",
      "url": `${siteConfig.url}/contact`
    }
  ];

  return (
    <div className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <SEO 
        title="Contact &amp; Booking"
        description="Share your idea, goals and expected timeline. Book a discovery call or send a project enquiry directly."
        canonicalPath="/contact"
        schema={pageSchema}
      />

      {/* Page Header */}
      <div className="max-w-3xl mb-16">
        <span className="text-xs font-semibold uppercase tracking-widest text-brand-peach block mb-3">
          CONTACT &amp; BOOKING
        </span>
        <h1 className="font-heading font-extrabold text-4xl md:text-5xl text-brand-text mb-6">
          Tell me what you want to build
        </h1>
        <p className="text-brand-muted text-base md:text-lg leading-relaxed">
          Share your idea, goals and expected timeline. I’ll review the details and get back to you with the next steps. Feel free to book a call directly or submit the project form.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Coordinates & Call slots */}
        <div className="lg:col-span-5 space-y-10">
          <div>
            <h2 className="font-heading font-bold text-xl text-brand-text mb-6">
              Connect Directly
            </h2>
            
            <div className="space-y-4">
              {/* Email Connection */}
              {email && (
                <div className="flex items-center space-x-4 p-4 bg-brand-card border border-brand-border rounded-brand-sm">
                  <div className="p-3 bg-brand-soft-peach rounded-brand-sm text-brand-peach">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-brand-muted block">Email Address</span>
                    <a href={`mailto:${email}`} className="text-sm font-semibold hover:text-brand-peach transition-colors duration-150">
                      {email}
                    </a>
                  </div>
                </div>
              )}

              {/* WhatsApp Connection */}
              {whatsappUrl && (
                <div className="flex items-center space-x-4 p-4 bg-brand-card border border-brand-border rounded-brand-sm">
                  <div className="p-3 bg-brand-soft-peach rounded-brand-sm text-brand-peach">
                    <MessageSquare className="w-5 h-5 text-brand-success" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-brand-muted block">WhatsApp Chat</span>
                    <a 
                      href={whatsappUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      onClick={() => trackEvent('whatsapp_clicked', { source: 'contact_page' })}
                      className="text-sm font-semibold hover:text-brand-peach transition-colors duration-150"
                    >
                      Chat with me
                    </a>
                  </div>
                </div>
              )}

              {/* Location Card */}
              <div className="flex items-center space-x-4 p-4 bg-brand-card border border-brand-border rounded-brand-sm">
                <div className="p-3 bg-brand-soft-peach rounded-brand-sm text-brand-peach">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-brand-muted block">Location</span>
                  <span className="text-sm font-semibold text-brand-text">
                    {siteConfig.location}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Cal.com booking boxes */}
          <div className="space-y-6">
            <h2 className="font-heading font-bold text-xl text-brand-text">
              Book a Scheduled Call
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              <BookingOptionCard
                type="discovery"
                title={bookingLinks.discovery.title}
                duration={bookingLinks.discovery.duration}
                description={bookingLinks.discovery.description}
                url={bookingLinks.discovery.url}
              />
              <BookingOptionCard
                type="consultation"
                title={bookingLinks.consultation.title}
                duration={bookingLinks.consultation.duration}
                description={bookingLinks.consultation.description}
                url={bookingLinks.consultation.url}
              />
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Form */}
        <div className="lg:col-span-7">
          <h2 className="font-heading font-bold text-xl text-brand-text mb-6">
            Submit a Project Enquiry
          </h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;

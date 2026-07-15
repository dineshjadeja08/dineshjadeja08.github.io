import { ArrowRight, CalendarDays, Clock, Mail, MapPin, MessageCircle } from 'lucide-react'
import { bookingLinks } from '../config/booking'
import { ContactForm } from '../components/ContactForm'
import { SectionHeading } from '../components/SectionHeading'
import { trackBookingEvent } from '../lib/analytics'
import { siteConfig, whatsappUrl } from '../lib/config'

const contactBookingCards = [
  {
    title: '30-Minute Discovery Call',
    description: 'Best for new website, e-commerce, SaaS or redesign projects.',
    booking: bookingLinks.discovery,
    event: 'booking_30min_clicked' as const,
    Icon: CalendarDays,
  },
  {
    title: '15-Minute Quick Call',
    description: 'Best for a quick question, small change or introductory discussion.',
    booking: bookingLinks.consultation,
    event: 'booking_15min_clicked' as const,
    Icon: Clock,
  },
]

export function ContactSection() {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-copy">
        <SectionHeading label="Contact" title="Let's build your website." compact />
        <p>Tell me what you want to create and I will help you turn it into a polished online presence.</p>
        <div className="contact-links">
          <a href={`mailto:${siteConfig.email}`}><Mail size={18} /> {siteConfig.email}</a>
          <a href={whatsappUrl()} target="_blank" rel="noreferrer"><MessageCircle size={18} /> Chat on WhatsApp</a>
          <span><MapPin size={18} /> {siteConfig.location}</span>
        </div>
        <div className="contact-booking-grid" aria-label="Booking options">
          {contactBookingCards.map(({ title, description, booking, event, Icon }) => (
            <a key={title} href={booking.url} target="_blank" rel="noopener noreferrer" onClick={() => trackBookingEvent(event)} className="contact-booking-card">
              <span><Icon size={20} /> {booking.duration}</span>
              <strong>{title}</strong>
              <p>{description}</p>
              <small>Open Cal.com <ArrowRight size={14} /></small>
            </a>
          ))}
        </div>
      </div>
      <ContactForm />
    </section>
  )
}

import { services } from '../data/services'
import { socialLinks } from '../data/socialLinks'
import { siteConfig } from '../lib/config'
import { BookCallButton } from './booking/BookCallButton'

const quickLinks = ['Home', 'About', 'Services', 'Work', 'Process', 'Contact']

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <span className="brand-mark">D</span>
        <div>
          <strong>Dinesh Kumar</strong>
          <small>Freelance Web Developer</small>
          <p>I build modern websites and web applications that help businesses establish a strong digital presence.</p>
        </div>
      </div>
      <div>
        <h3>Quick Links</h3>
        {quickLinks.map((item) => <a key={item} href={item === 'Work' ? '/projects' : `/#${item.toLowerCase()}`}>{item}</a>)}
      </div>
      <div>
        <h3>Services</h3>
        {services.map((service) => <a key={service.title} href="/#services">{service.title}</a>)}
      </div>
      <div>
        <h3>Social Links</h3>
        {socialLinks.map(({ label, href, Icon }) => (
          <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
            <Icon size={16} /> {label}
          </a>
        ))}
        <BookCallButton type="selector" label="Schedule a call" className="footer-booking-link" />
        <span className="footer-location">{siteConfig.location}</span>
      </div>
      <div className="footer-bottom">© 2026 Dinesh Kumar. All rights reserved.</div>
    </footer>
  )
}

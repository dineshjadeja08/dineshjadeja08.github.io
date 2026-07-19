import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Mail, MessageSquare, MapPin, Phone } from 'lucide-react';
import { siteConfig } from '../../config/site';
import { useBooking } from '../../hooks/useBooking';
import { getWhatsAppLink } from '../../lib/whatsapp';
import { getActiveSocialLinks } from '../../data/socialLinks';
import { trackEvent } from '../../lib/analytics';

export const Footer = () => {
  const { openBooking } = useBooking();
  const location = useLocation();
  const navigate = useNavigate();
  const activeSocials = getActiveSocialLinks();
  const whatsappUrl = getWhatsAppLink("Hi Dinesh, I want to talk about a website project.");

  const handleHashLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/' + hash);
    } else {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleBookClick = () => {
    trackEvent('booking_modal_opened', { source: 'footer' });
    openBooking();
  };

  return (
    <footer className="bg-brand-dark text-[#8a8782] border-t border-[#2a2a2a] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16 text-left">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4 md:col-span-1 lg:col-span-1">
            <Link 
              to="/" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-block"
            >
              <div className="flex items-center space-x-2">
                <span className="dk-logo-mark dk-logo-mark-light" aria-hidden="true" />
                <div className="flex flex-col text-left">
                  <span className="font-heading font-extrabold text-white text-sm leading-tight tracking-tight uppercase">
                    DINESH KUMAR
                  </span>
                  <span className="text-[9px] uppercase font-bold tracking-widest text-[#8a8782] leading-none">
                    Freelance Web Developer
                  </span>
                </div>
              </div>
            </Link>
            <p className="text-xs text-[#8a8782] leading-relaxed">
              Building fast, modern and scalable websites that help your business grow.
            </p>
            
            {/* Social Icons row */}
            {activeSocials.length > 0 && (
              <div className="flex space-x-2 pt-2">
                {activeSocials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1.5 bg-[#222222] hover:bg-brand-peach text-[#c4c1bc] hover:text-white rounded-brand-sm text-[10px] uppercase tracking-wider font-semibold transition-all duration-200"
                    aria-label={`Visit Dinesh's ${social.name}`}
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-xs text-white uppercase tracking-widest mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3 text-xs">
              <li>
                <Link to="/" className="hover:text-white transition-colors duration-150">Home</Link>
              </li>
              <li>
                <a 
                  href="#about" 
                  onClick={(e) => handleHashLinkClick(e, '#about')}
                  className="hover:text-white transition-colors duration-150"
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  href="#services" 
                  onClick={(e) => handleHashLinkClick(e, '#services')} 
                  className="hover:text-white transition-colors duration-150"
                >
                  Services
                </a>
              </li>
              <li>
                <a 
                  href="#work" 
                  onClick={(e) => handleHashLinkClick(e, '#work')}
                  className="hover:text-white transition-colors duration-150"
                >
                  Work
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  onClick={(e) => handleHashLinkClick(e, '#contact')}
                  className="hover:text-white transition-colors duration-150"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="font-heading font-bold text-xs text-white uppercase tracking-widest mb-6">
              Services
            </h4>
            <ul className="space-y-3 text-xs">
              <li>Business Websites</li>
              <li>Landing Pages</li>
              <li>E-Commerce</li>
              <li>Website Redesign</li>
              <li>Front-End Dev</li>
              <li>Back-End Dev</li>
            </ul>
          </div>

          {/* Col 4: Resources */}
          <div>
            <h4 className="font-heading font-bold text-xs text-white uppercase tracking-widest mb-6">
              Resources
            </h4>
            <ul className="space-y-3 text-xs">
              <li>
                <a 
                  href="#faq" 
                  onClick={(e) => handleHashLinkClick(e, '#faq')}
                  className="hover:text-white transition-colors duration-150"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a 
                  href="#process" 
                  onClick={(e) => handleHashLinkClick(e, '#process')}
                  className="hover:text-white transition-colors duration-150"
                >
                  Process
                </a>
              </li>
              <li>
                <button 
                  onClick={handleBookClick}
                  className="hover:text-white text-left transition-colors duration-150"
                >
                  Pricing
                </button>
              </li>
              <li>
                <a 
                  href="#reviews" 
                  onClick={(e) => handleHashLinkClick(e, '#reviews')}
                  className="hover:text-white transition-colors duration-150"
                >
                  Reviews
                </a>
              </li>
              <li className="text-[#555555]">Blog (Coming Soon)</li>
            </ul>
          </div>

          {/* Col 5: Let's Connect */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-xs text-white uppercase tracking-widest mb-6">
              Let's Connect
            </h4>
            
            <ul className="space-y-3 text-xs">
              <li className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-brand-peach shrink-0" />
                <span>Tirupattur, Tamil Nadu, India</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-brand-peach shrink-0" />
                <a href={`mailto:${siteConfig.email || 'hello@dineshkumar.dev'}`} className="hover:text-white transition-colors">
                  {siteConfig.email || 'hello@dineshkumar.dev'}
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-brand-peach shrink-0" />
                <span>+91 96290 25814</span>
              </li>
            </ul>

            {whatsappUrl && (
              <div className="pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('whatsapp_clicked', { source: 'footer' })}
                  className="inline-flex items-center justify-center w-full py-2.5 px-4 bg-brand-success hover:bg-brand-success/90 text-white font-heading font-semibold rounded-brand-sm text-xs transition-all duration-200 active:scale-95"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Footer bottom */}
        <div className="pt-8 border-t border-[#222222] flex flex-col md:flex-row items-center justify-between text-xs text-[#6e6b66] space-y-4 md:space-y-0">
          <div>
            © 2026 Dinesh Kumar. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <Link to="/privacy-policy" className="hover:text-white transition-colors duration-150">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="hover:text-white transition-colors duration-150">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import BookingModal from '../booking/BookingModal';
import { getWhatsAppLink } from '../../lib/whatsapp';
import { trackEvent } from '../../lib/analytics';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [showMobileWhatsApp, setShowMobileWhatsApp] = useState(false);
  const whatsappUrl = getWhatsAppLink('Hi Dinesh, I found your portfolio and want to discuss a website project.');

  useEffect(() => {
    const handleScroll = () => setShowMobileWhatsApp(window.scrollY > 560);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-brand-bg text-brand-text">
      {/* Header Sticky Navigation */}
      <Navbar />
      
      {/* Main content page shell with layout top offset for navbar */}
      <main id="main-content" className="flex-grow pt-[72px] md:pt-[82px]">
        {children}
      </main>
      
      {/* Footer Navigation section */}
      <Footer />

      {whatsappUrl && (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`mobile-whatsapp-fab ${showMobileWhatsApp ? 'is-visible' : ''}`}
          aria-label="Chat on WhatsApp"
          onClick={() => trackEvent('whatsapp_clicked', { source: 'mobile_sticky' })}
        >
          <MessageCircle size={20} />
          <span>WhatsApp</span>
        </a>
      )}

      {/* Global Booking Selection Overlay Dialog */}
      <BookingModal />
    </div>
  );
};

export default Layout;

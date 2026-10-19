import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useBooking } from '../../hooks/useBooking';
import { bookingLinks } from '../../config/booking';
import { siteConfig } from '../../config/site';
import BookingOptionCard from './BookingOptionCard';

export const BookingModal = () => {
  const { isBookingOpen, closeBooking } = useBooking();
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  // Handle focus trapping and ESC close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeBooking();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex="0"]'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    if (isBookingOpen) {
      // Save active element to restore later
      triggerRef.current = document.activeElement as HTMLElement;
      // Lock scroll
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
      
      // Focus modal container
      setTimeout(() => {
        if (modalRef.current) {
          modalRef.current.focus();
        }
      }, 100);
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
      if (triggerRef.current) {
        triggerRef.current.focus();
      }
    };
  }, [isBookingOpen, closeBooking]);

  return (
    <AnimatePresence>
      {isBookingOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-start md:items-center justify-center overflow-y-auto p-3 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
        >
          {/* Backdrop Overlay */}
          <motion.div 
            className="fixed inset-0 bg-[#151515]/60 backdrop-blur-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeBooking}
          />

          {/* Modal Content Wrapper */}
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            className="relative z-10 w-full max-w-2xl max-h-[calc(100dvh-24px)] overflow-y-auto bg-brand-bg border border-brand-border rounded-brand-lg shadow-xl focus:outline-none p-5 sm:p-6 md:p-10"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.4 }}
          >
            {/* Close Button */}
            <button
              onClick={closeBooking}
              className="absolute top-3 right-3 md:top-4 md:right-4 p-2 rounded-brand-pill text-brand-muted hover:text-brand-text hover:bg-brand-secondary transition-colors duration-200"
              aria-label="Close booking modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center mb-5 md:mb-8 max-w-lg mx-auto px-6 md:px-0">
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-peach block mb-2">
                SCHEDULE A CONVERSATION
              </span>
              <h2 
                id="booking-modal-title" 
                className="font-heading font-extrabold text-xl sm:text-2xl md:text-3xl text-brand-text mb-2 md:mb-3"
              >
                Let’s talk about your project
              </h2>
              <p className="text-brand-muted text-xs sm:text-sm leading-relaxed">
                Choose the conversation that fits your project. Calls are hosted on Cal.com and are free and friendly.
              </p>
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
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

            {/* Footer Notice */}
            <div className="text-center mt-5 pt-4 md:mt-8 md:pt-6 border-t border-brand-border">
              <p className="text-xs text-brand-muted">
                Need to email instead? Contact me directly at{" "}
                <a 
                  href={`mailto:${siteConfig.email}`}
                  className="font-semibold underline hover:text-brand-peach transition-colors duration-150"
                >
                  {siteConfig.email}
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;

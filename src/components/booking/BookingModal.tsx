import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, CalendarDays, Clock, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { bookingLinks } from '../../config/booking'
import { useScrollLock } from '../../hooks/useScrollLock'
import { trackBookingEvent } from '../../lib/analytics'

type BookingModalProps = {
  open: boolean
  onClose: () => void
}

const options = [
  {
    key: 'discovery',
    analytics: 'booking_30min_clicked',
    eyebrow: '30-Minute Discovery Call',
    ...bookingLinks.discovery,
  },
  {
    key: 'consultation',
    analytics: 'booking_15min_clicked',
    eyebrow: '15-Minute Quick Call',
    ...bookingLinks.consultation,
  },
] as const

export function BookingModal({ open, onClose }: BookingModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  useScrollLock(open)

  useEffect(() => {
    if (!open) return
    closeButtonRef.current?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, open])

  function openOption(option: (typeof options)[number]) {
    trackBookingEvent(option.analytics)
    window.open(option.url, '_blank', 'noopener,noreferrer')
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="booking-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
          role="presentation"
        >
          <motion.dialog
            aria-labelledby="booking-modal-title"
            aria-modal="true"
            className="booking-modal"
            open
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button ref={closeButtonRef} className="booking-close" type="button" onClick={onClose} aria-label="Close booking options">
              <X size={20} />
            </button>
            <span className="section-kicker">Book a Call</span>
            <h2 id="booking-modal-title">Choose the call that fits your project.</h2>
            <p>Pick a short consultation or a deeper project discovery call. Both open securely on Cal.com.</p>
            <div className="booking-options-grid">
              {options.map((option) => (
                <button className="booking-option-card" key={option.key} type="button" onClick={() => openOption(option)}>
                  <span className="booking-option-icon"><CalendarDays size={22} /></span>
                  <small>{option.eyebrow}</small>
                  <strong>{option.title}</strong>
                  <span className="booking-duration"><Clock size={15} /> {option.duration}</span>
                  <p>{option.description}</p>
                  <span className="booking-option-action">Open Cal.com <ArrowRight size={16} /></span>
                </button>
              ))}
            </div>
          </motion.dialog>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

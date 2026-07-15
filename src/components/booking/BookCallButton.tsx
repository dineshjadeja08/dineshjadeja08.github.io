import { CalendarDays, Clock } from 'lucide-react'
import { useState } from 'react'
import { bookingLinks } from '../../config/booking'
import { trackBookingEvent } from '../../lib/analytics'
import { BookingModal } from './BookingModal'

type BookCallButtonProps = {
  type?: 'discovery' | 'consultation' | 'selector'
  label?: string
  className?: string
}

export function BookCallButton({ type = 'selector', label, className = 'primary-button' }: BookCallButtonProps) {
  const [modalOpen, setModalOpen] = useState(false)

  if (type === 'selector') {
    return (
      <>
        <button
          className={className}
          type="button"
          onClick={() => {
            trackBookingEvent('booking_modal_opened')
            setModalOpen(true)
          }}
          aria-label={label || 'Open booking options'}
        >
          <CalendarDays size={18} /> {label || 'Book a Call'}
        </button>
        <BookingModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </>
    )
  }

  const booking = bookingLinks[type]
  const eventName = type === 'discovery' ? 'booking_30min_clicked' : 'booking_15min_clicked'
  const Icon = type === 'discovery' ? CalendarDays : Clock

  return (
    <a
      className={className}
      href={booking.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label || booking.title} opens in a new tab`}
      onClick={() => trackBookingEvent(eventName)}
    >
      <Icon size={18} /> {label || booking.title}
    </a>
  )
}

type BookingEvent = 'booking_modal_opened' | 'booking_30min_clicked' | 'booking_15min_clicked'

export function trackBookingEvent(event: BookingEvent) {
  if (import.meta.env.DEV) {
    console.info(`[analytics] ${event}`)
  }
}

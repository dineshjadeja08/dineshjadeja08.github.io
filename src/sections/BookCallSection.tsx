import { BookCallButton } from '../components/booking/BookCallButton'

export function BookCallSection() {
  return (
    <section className="book-call-section">
      <div>
        <span>Let's Work Together</span>
        <h2>Have a project in mind?</h2>
        <p>
          Book a free call and tell me about your business, idea or current website. We can discuss the right solution, expected timeline and next steps.
        </p>
        <div className="book-call-actions">
          <BookCallButton type="discovery" label="Book a Free Discovery Call" className="light-button" />
          <BookCallButton type="consultation" label="Take a Quick 15-Minute Call" className="dark-outline-button" />
        </div>
      </div>
      <div className="calendar-art" aria-hidden="true">
        <i /><i /><i /><i /><i /><i /><i /><i /><i />
      </div>
    </section>
  )
}

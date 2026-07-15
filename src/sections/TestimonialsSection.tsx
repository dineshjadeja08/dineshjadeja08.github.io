import { testimonials } from '../data/testimonials'

export function TestimonialsSection() {
  if (testimonials.length === 0) return null

  return (
    <section className="testimonials-section">
      <span className="section-kicker">Testimonials</span>
      <h2>Client feedback</h2>
      <div className="review-grid">
        {testimonials.map((testimonial) => (
          <article className="review-card" key={`${testimonial.name}-${testimonial.company}`}>
            <p>"{testimonial.quote}"</p>
            <strong>{testimonial.name}</strong>
            <small>{testimonial.company}</small>
          </article>
        ))}
      </div>
    </section>
  )
}

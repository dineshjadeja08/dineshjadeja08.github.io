import { CheckCircle2 } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'

const benefits = [
  'Clear and direct communication',
  'Mobile-responsive development',
  'Modern and clean design',
  'Transparent project scope',
  'Regular progress updates',
  'Careful, practical implementation',
  'Deployment support',
  'Post-launch assistance',
]

export function BenefitsSection() {
  return (
    <section className="benefits-section">
      <SectionHeading label="Why Work With Me" title="What you can expect when working with me" />
      <div className="benefits-grid">
        {benefits.map((benefit) => <article key={benefit}><CheckCircle2 size={19} /> {benefit}</article>)}
      </div>
    </section>
  )
}

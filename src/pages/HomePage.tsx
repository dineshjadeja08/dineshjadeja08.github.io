import { AboutSection } from '../sections/AboutSection'
import { BenefitsSection } from '../sections/BenefitsSection'
import { BookCallSection } from '../sections/BookCallSection'
import { ContactSection } from '../sections/ContactSection'
import { ExperienceSection } from '../sections/ExperienceSection'
import { HeroSection } from '../sections/HeroSection'
import { ProcessSection } from '../sections/ProcessSection'
import { ServicesSection } from '../sections/ServicesSection'
import { SkillsSection } from '../sections/SkillsSection'
import { TestimonialsSection } from '../sections/TestimonialsSection'
import { WorkSection } from '../sections/WorkSection'

export function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <WorkSection />
      <SkillsSection />
      <ProcessSection />
      <BenefitsSection />
      <ExperienceSection />
      <TestimonialsSection />
      <BookCallSection />
      <ContactSection />
    </>
  )
}

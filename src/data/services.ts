import { Code2, Globe2, RefreshCcw, Rocket, Server, ShoppingCart, type LucideIcon } from 'lucide-react'

export type Service = {
  title: string
  description: string
  Icon: LucideIcon
  tone: 'blue' | 'peach' | 'purple' | 'green' | 'sky' | 'gold'
}

export const services: Service[] = [
  {
    title: 'Business Websites',
    description: 'Professional websites for local businesses, startups, farms, consultants and service providers.',
    Icon: Globe2,
    tone: 'blue',
  },
  {
    title: 'Landing Pages',
    description: 'Focused landing pages for product launches, campaigns, lead generation and marketing.',
    Icon: Rocket,
    tone: 'peach',
  },
  {
    title: 'E-commerce Websites',
    description: 'Modern online stores with products, categories, cart, checkout and admin management.',
    Icon: ShoppingCart,
    tone: 'purple',
  },
  {
    title: 'Web Application Development',
    description: 'Custom dashboards, SaaS tools, portals and business applications.',
    Icon: Code2,
    tone: 'green',
  },
  {
    title: 'Backend Development',
    description: 'Secure APIs, authentication, database integration and admin systems using Python and Django.',
    Icon: Server,
    tone: 'sky',
  },
  {
    title: 'Website Redesign',
    description: 'Redesign outdated websites into modern, responsive and user-friendly experiences.',
    Icon: RefreshCcw,
    tone: 'gold',
  },
]

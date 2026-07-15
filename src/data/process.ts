import { BadgeCheck, BriefcaseBusiness, Code2, Rocket, ShieldCheck, Sparkles, type LucideIcon } from 'lucide-react'

export type ProcessStep = {
  title: string
  description: string
  Icon: LucideIcon
}

export const processSteps: ProcessStep[] = [
  {
    title: 'Discovery',
    description: 'You tell me about your business, target users, goals, required features and budget.',
    Icon: BriefcaseBusiness,
  },
  {
    title: 'Planning',
    description: 'I organise the pages, user flow, features and project timeline.',
    Icon: BadgeCheck,
  },
  {
    title: 'Design Direction',
    description: 'I create the visual direction, layout and user experience.',
    Icon: Sparkles,
  },
  {
    title: 'Development',
    description: 'I build the website or application using the most suitable technology.',
    Icon: Code2,
  },
  {
    title: 'Testing',
    description: 'I test responsiveness, forms, usability and the important flows before launch.',
    Icon: ShieldCheck,
  },
  {
    title: 'Launch and Support',
    description: 'I deploy the product and provide support for updates and improvements.',
    Icon: Rocket,
  },
]

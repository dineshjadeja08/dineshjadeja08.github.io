export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery",
    description: "We discuss your business, target users, goals, required features, timeline and expected budget."
  },
  {
    number: "02",
    title: "Planning",
    description: "I organise the sitemap, user flow, technical requirements and project milestones."
  },
  {
    number: "03",
    title: "Design Direction",
    description: "I define the visual style, page structure and overall user experience."
  },
  {
    number: "04",
    title: "Development",
    description: "I build the website or application with responsive layouts and working functionality."
  },
  {
    number: "05",
    title: "Testing & Review",
    description: "I test the project across devices, review important user flows and fix issues."
  },
  {
    number: "06",
    title: "Launch & Support",
    description: "I deploy the project, connect the domain and provide agreed post-launch support."
  }
];

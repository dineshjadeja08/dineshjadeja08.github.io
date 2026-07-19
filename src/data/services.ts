export interface Service {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
}

export const services: Service[] = [
  {
    id: "business-websites",
    title: "Business Websites",
    description: "Professional websites to establish your brand online.",
    deliverables: [
      "Responsive pages",
      "Contact and enquiry forms",
      "WhatsApp integration",
      "Basic SEO",
      "Domain and deployment support"
    ]
  },
  {
    id: "landing-pages",
    title: "Landing Pages",
    description: "High-converting landing pages for your product or service.",
    deliverables: [
      "Strong conversion flow",
      "Mobile-first design",
      "Clear call-to-action sections",
      "Enquiry collection",
      "Analytics-ready structure"
    ]
  },
  {
    id: "ecommerce-websites",
    title: "E-Commerce",
    description: "Online stores that are fast, secure & easy to manage.",
    deliverables: [
      "Product catalogue",
      "Categories and collections",
      "Cart and checkout",
      "Customer accounts",
      "Order management",
      "Admin product management"
    ]
  },
  {
    id: "website-redesign",
    title: "Website Redesign",
    description: "Modernize your existing website with a fresh new look.",
    deliverables: [
      "UI refresh",
      "Mobile responsiveness",
      "Better page structure",
      "Performance improvements",
      "Clearer calls to action"
    ]
  },
  {
    id: "frontend-development",
    title: "Front-End Development",
    description: "React, Tailwind, and modern UI for exceptional user experiences.",
    deliverables: [
      "Framer Motion animations",
      "TypeScript integration",
      "Interactive components",
      "Figma to code conversion",
      "Vite setup & build optimization"
    ]
  },
  {
    id: "backend-development",
    title: "Back-End Development",
    description: "Robust APIs and backend solutions using Python & Django.",
    deliverables: [
      "Django REST Framework",
      "JWT authentication setup",
      "PostgreSQL database integration",
      "Security configurations",
      "Third party API integrations"
    ]
  }
];

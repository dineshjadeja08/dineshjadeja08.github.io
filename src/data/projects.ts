export type Project = {
  slug: string
  name: string
  category: string
  description: string
  role?: string
  features?: string[]
  tags: string[]
  image: string
  liveUrl?: string
  status?: string
}

export const projects: Project[] = [
  {
    slug: 'grf-growths',
    name: 'GRF Growths',
    category: 'Client Business Website',
    description:
      'A responsive poultry and rooster farming business website created to showcase products, farming services, business information and customer enquiries.',
    role: 'UI design, frontend development, responsive development and deployment.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Netlify'],
    image: '/portfolio/project-grf.png',
    liveUrl: 'https://grfgrowths.netlify.app/',
  },
  {
    slug: 'linksync',
    name: 'LinkSync',
    category: 'SaaS Product',
    description:
      'A bio-link platform that lets users create personal profile pages, manage links, collect leads and track link clicks.',
    features: ['User authentication', 'Public profile pages', 'Drag-and-drop link ordering', 'Lead collection', 'Click analytics', 'Theme customisation'],
    tags: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'Vercel'],
    image: '/portfolio/project-linksync.png',
    liveUrl: 'https://linksynk.vercel.app/',
  },
  {
    slug: 'cavve',
    name: 'CAVVE',
    category: 'Fashion E-commerce Platform',
    description:
      'A premium fashion e-commerce concept created for a minimalist clothing brand, including product browsing, collections, cart, checkout, wishlist, customer accounts and an admin dashboard.',
    features: ['Product management', 'Collections', 'Inventory', 'Orders', 'Customers', 'Coupons', 'Homepage content management', 'Reviews', 'Shipping', 'Returns and refunds'],
    tags: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'Vercel'],
    image: '/portfolio/project-cavve.png',
    status: 'Product in development',
  },
  {
    slug: 'xenfirm',
    name: 'XenFirm',
    category: 'Business Website',
    description: 'A personal brand website concept for presenting services, products, projects and selected work in one clean place.',
    tags: ['React', 'Tailwind CSS', 'Netlify'],
    image: '/portfolio/project-xenfirm.png',
    liveUrl: 'https://xenfirm.com/',
  },
  {
    slug: 'clientease-crm',
    name: 'ClientEase CRM',
    category: 'CRM Web Application',
    description: 'A Django-based customer relationship management system for managing contacts, deals and sales pipeline stages.',
    tags: ['Python', 'Django', 'Django REST Framework', 'PostgreSQL'],
    image: '/portfolio/project-linksync.png',
  },
  {
    slug: 'employee-management-api',
    name: 'Employee Management API',
    category: 'Backend API Project',
    description: 'A REST API for managing employees with JWT authentication, filtering, pagination and database integration.',
    tags: ['Python', 'Django', 'Django REST Framework', 'JWT', 'PostgreSQL'],
    image: '/portfolio/project-xenfirm.png',
  },
  {
    slug: 'spamguard-api',
    name: 'SpamGuard API',
    category: 'Backend API',
    description: 'A Django REST API that provides secure authentication and spam-related data management endpoints.',
    tags: ['Python', 'Django', 'Django REST Framework', 'JWT'],
    image: '/portfolio/project-cavve.png',
  },
  {
    slug: 'qrnow',
    name: 'QRNow',
    category: 'Micro SaaS Concept',
    description: 'A QR-code platform concept for generating, managing and tracking QR codes for individuals and businesses.',
    tags: ['React', 'Supabase', 'Tailwind CSS'],
    image: '/portfolio/project-grf.png',
  },
]

export const featuredProjects = projects.slice(0, 4)

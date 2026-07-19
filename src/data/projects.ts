import cavveImage from '../assets/images/projects/cavve.webp';
import clienteaseImage from '../assets/images/projects/clientease-real.webp';
import employeeApiImage from '../assets/images/projects/employee-api-real.webp';
import grfGrowthsImage from '../assets/images/projects/grf-growths.webp';
import linksyncImage from '../assets/images/projects/linksync.webp';
import qrnowImage from '../assets/images/projects/qrnow-real.webp';
import spamguardImage from '../assets/images/projects/spamguard-real.webp';
import xenfirmImage from '../assets/images/projects/xenfirm.webp';

export interface Project {
  slug: string;
  name: string;
  category: string;
  status: string;
  featured: boolean;
  description: string;
  problem: string;
  solution: string;
  role: string[];
  features?: string[];
  technologies: string[];
  challenges?: string;
  outcome?: string;
  liveUrl?: string;
  image: string;
  conversionGoal?: string;
  resultMetric?: string;
}

export const projects: Project[] = [
  {
    slug: "grf-growths",
    name: "GRF Growths",
    category: "Client Business Website",
    status: "Live",
    featured: true,
    description: "A responsive poultry and rooster farming business website designed to showcase the farm, available breeds, product details and customer enquiry options.",
    problem: "The poultry farm business needed a professional online presence where potential customers could learn about the farm, view the quality of roosters and breeds, and easily submit purchase and general enquiries.",
    solution: "I designed and developed a mobile-friendly business website with clear sections, visual breed presentations, farm details, and highly direct call-to-action contact options.",
    role: [
      "Website planning",
      "UI design",
      "Frontend development",
      "Responsive implementation",
      "Netlify deployment"
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Netlify"],
    challenges: "The primary challenge was designing a clean editorial look that represents a farm operation in a professional, modern way, while making sure the contact forms are easily accessible on low-end mobile devices.",
    outcome: "The farm successfully launched its online catalog, allowing regional buyers to easily contact the owners via automated forms and WhatsApp.",
    liveUrl: "https://grfgrowths.netlify.app/",
    image: grfGrowthsImage,
    conversionGoal: "Turn farm visitors into WhatsApp and enquiry leads.",
    resultMetric: "Clear enquiry path for regional buyers"
  },
  {
    slug: "linksync",
    name: "LinkSync",
    category: "SaaS Product",
    status: "Live MVP",
    featured: true,
    description: "A bio-link SaaS platform where users can create personal profile pages, manage links, collect leads and track link engagement.",
    problem: "Content creators and local businesses need a simple, single link to share on social profiles that aggregates their links, tracks engagement, and collects lead signups without maintaining a complex site.",
    solution: "I built a modern bio-link platform featuring user authentication, custom theme styling, real-time link click analytics, lead collection, and drag-and-drop link sorting.",
    role: [
      "Product design",
      "Database architecture",
      "Authentication setup",
      "Frontend & Backend integration",
      "Vercel deployment"
    ],
    features: [
      "Email and password authentication",
      "Public username profile pages",
      "Link creation and management",
      "Drag-and-drop link ordering",
      "Click tracking",
      "Lead collection",
      "Theme customisation",
      "Supabase Row Level Security"
    ],
    technologies: ["React", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS", "Vercel"],
    challenges: "Implementing a clean drag-and-drop interface that updates database sequence order efficiently, combined with securing public user profiles using Supabase Row Level Security (RLS).",
    outcome: "Created a working MVP where users can sign up, claim a custom slug, add styling, and view basic click count statistics immediately.",
    liveUrl: "https://linksynk.vercel.app/",
    image: linksyncImage,
    conversionGoal: "Help creators collect leads and track link engagement.",
    resultMetric: "MVP with signup, leads and analytics"
  },
  {
    slug: "cavve",
    name: "CAVVE",
    category: "Fashion E-commerce Platform",
    status: "In Development",
    featured: true,
    description: "A premium minimalist fashion-commerce platform created for a clothing brand, covering customer shopping flows and complete admin management.",
    problem: "The clothing brand wanted a high-end storefront with a unique visual layout that feels different from typical generic online templates, alongside a robust administrative panel to manage stock and inventory.",
    solution: "I designed and developed a product-focused, editorial e-commerce platform with collection sliders, wishlist flows, dynamic cart actions, checkout states, and an exhaustive backend dashboard.",
    role: [
      "E-commerce workflow planning",
      "Admin panel design & development",
      "Database schema creation",
      "State management implementation"
    ],
    features: [
      "Product catalogue",
      "Product detail pages",
      "Collections",
      "Wishlist",
      "Cart",
      "Checkout",
      "Customer accounts",
      "Product and inventory management",
      "Order management",
      "Customer management",
      "Coupons",
      "Homepage content management",
      "Reviews",
      "Shipping configuration",
      "Refund and return requests",
      "Audit logs"
    ],
    technologies: ["React", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS", "Vercel"],
    challenges: "Handling inventory constraints across nested variations (sizes/colors) while ensuring smooth, instant state updates in the cart without database bottlenecks.",
    outcome: "Built a fully functional store prototype with a complete dashboard for managing order fulfillment, customer profiles, shipping, and discount rules.",
    image: cavveImage,
    conversionGoal: "Make premium products easier to browse, save and buy.",
    resultMetric: "Storefront plus full admin workflow"
  },
  {
    slug: "xenfirm",
    name: "XenFirm",
    category: "Business and Services Website",
    status: "Live",
    featured: true,
    description: "A modern website for my software and digital-services brand, created to present services, products, project work and business information.",
    problem: "A clean, modern online portal was needed to present freelance software services, project case studies, and digital building processes under a unified tech-forward service brand.",
    solution: "I implemented a highly polished, responsive marketing site that highlights service offerings, technology stacks, and contact options with a clean modern aesthetic.",
    role: [
      "UI design & typography selection",
      "Frontend components build",
      "SEO optimization",
      "Production deployment"
    ],
    technologies: ["React", "Tailwind CSS", "Netlify"],
    challenges: "Creating interactive components and transition states that feel responsive and high-fidelity without adding heavy third-party UI libraries.",
    outcome: "Successfully launched the brand presence, serving as a hub for client outreach and project inquiries.",
    liveUrl: "https://xenfirm.com/",
    image: xenfirmImage,
    conversionGoal: "Position services clearly and drive project enquiries.",
    resultMetric: "Launched service-brand hub"
  },
  {
    slug: "clientease-crm",
    name: "ClientEase CRM",
    category: "CRM Web Application",
    status: "Completed Project",
    featured: false,
    description: "A Django-based customer relationship management application for managing contacts, deals and sales pipeline stages.",
    problem: "Small teams need a direct way to log contacts, associate them with deals, track their current sales funnel stage, and view simple metrics without paying for bloated corporate software.",
    solution: "I built a Python and Django web app that manages relations between users, businesses, and deals, presenting pipeline data in a Kanban-style layout.",
    role: [
      "Database schema creation",
      "ORM query optimization",
      "Backend REST API development",
      "Admin dashboard setup"
    ],
    technologies: ["Python", "Django", "Django REST Framework", "PostgreSQL"],
    challenges: "Designing clean PostgreSQL relational integrity tables that handle history tracking when a deal is moved from one stage of the pipeline to another.",
    outcome: "Delivered a lightweight, secure CRM solution with simple user management, email logging placeholders, and dashboard reports.",
    image: clienteaseImage,
    conversionGoal: "Help teams manage leads instead of losing them in spreadsheets.",
    resultMetric: "Pipeline-ready CRM structure"
  },
  {
    slug: "employee-management-api",
    name: "Employee Management API",
    category: "Backend API",
    status: "Completed Project",
    featured: false,
    description: "A REST API for managing employee records with JWT authentication, filtering, pagination and structured database integration.",
    problem: "A secure, robust backend system was required to perform CRUD operations on organizational employee structures, supporting filtered queries and clean paginated payloads.",
    solution: "I designed and deployed a Python Django REST API, implementing robust token-based access security, search filters, and page configurations.",
    role: [
      "API layout and routing",
      "JWT security configuration",
      "Query filtering implementation",
      "Comprehensive test scripting"
    ],
    technologies: ["Python", "Django", "Django REST Framework", "JWT", "PostgreSQL"],
    challenges: "Configuring custom filters that handle searches across multiple related tables (e.g., department, sub-roles, hierarchy) without introducing database query performance lags.",
    outcome: "Built a solid backend API ready to be consumed by external dashboards, verified through clean automated tests.",
    image: employeeApiImage,
    conversionGoal: "Give teams a reliable backend for employee operations.",
    resultMetric: "Secure API foundation"
  },
  {
    slug: "spamguard-api",
    name: "SpamGuard API",
    category: "Backend API",
    status: "Completed Project",
    featured: false,
    description: "A secure Django REST API project with JWT-based authentication and structured spam-related data-management endpoints.",
    problem: "A system was needed to process, validate, flag, and filter user spam entries, storing malicious activity logs while enforcing tight user security constraints.",
    solution: "I developed a secure REST API in Python featuring JWT authentication, request body validators, and endpoints to query threat intelligence data.",
    role: [
      "Database design",
      "API request validation logic",
      "JWT user authentication setup"
    ],
    technologies: ["Python", "Django", "Django REST Framework", "JWT"],
    challenges: "Ensuring that spam query endpoints return results extremely quickly while storing high-volume log requests safely in the database.",
    outcome: "Created a secure API prototype that successfully sanitizes incoming requests and provides clean, structured JSON analysis outputs.",
    image: spamguardImage,
    conversionGoal: "Protect user trust with safer spam and threat checks.",
    resultMetric: "Fast validation API prototype"
  },
  {
    slug: "qrnow",
    name: "QRNow",
    category: "Micro-SaaS Concept",
    status: "Concept Project",
    featured: false,
    description: "A QR-code platform concept for generating, organising and managing QR codes for individuals and small businesses.",
    problem: "Users need a simplified solution to instantly generate custom-styled QR codes, organize them into folders, and modify destination URLs after creation.",
    solution: "I created a frontend concept dashboard showcasing immediate SVG QR code generation, category tags, and click analytics placeholders.",
    role: [
      "UI/UX product design",
      "Frontend dashboard builder",
      "Supabase database integration"
    ],
    technologies: ["React", "Supabase", "Tailwind CSS"],
    challenges: "Managing state configurations for QR design elements (colors, logos, rounded corners) and generating the clean SVG elements on-the-fly.",
    outcome: "Created a responsive micro-SaaS dashboard mockup showing intuitive creation and organization flows.",
    image: qrnowImage,
    conversionGoal: "Help businesses create trackable QR campaigns quickly.",
    resultMetric: "Dashboard concept for QR management"
  }
];

export interface SkillGroup {
  category: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Vite",
      "Tailwind CSS",
      "Responsive Web Design"
    ]
  },
  {
    category: "Backend",
    skills: [
      "Python",
      "Django",
      "Django REST Framework",
      "Flask",
      "FastAPI",
      "REST APIs",
      "JWT Authentication"
    ]
  },
  {
    category: "Databases & Cloud",
    skills: [
      "PostgreSQL",
      "MySQL",
      "SQLite",
      "Supabase",
      "Supabase Authentication",
      "Supabase Storage",
      "Row Level Security"
    ]
  },
  {
    category: "Tools & Deployment",
    skills: [
      "Git",
      "GitHub",
      "Postman",
      "VS Code",
      "Netlify",
      "Vercel",
      "Render",
      "Docker Basics",
      "Jira"
    ]
  },
  {
    category: "Testing & Automation",
    skills: [
      "Selenium",
      "BeautifulSoup",
      "Pytest",
      "Unit Testing",
      "API Testing",
      "CSV & JSON Processing"
    ]
  }
];

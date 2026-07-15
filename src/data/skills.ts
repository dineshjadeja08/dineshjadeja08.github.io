export type SkillGroup = {
  category: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'Frontend',
    skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Vite', 'Tailwind CSS', 'Responsive Design'],
  },
  {
    category: 'Backend',
    skills: ['Python', 'Django', 'Django REST Framework', 'Flask', 'FastAPI', 'REST APIs', 'JWT Authentication'],
  },
  {
    category: 'Database and Cloud',
    skills: ['PostgreSQL', 'MySQL', 'SQLite', 'Supabase', 'Supabase Auth', 'Supabase Storage', 'Row Level Security'],
  },
  {
    category: 'Tools',
    skills: ['Git', 'GitHub', 'Postman', 'VS Code', 'Netlify', 'Vercel', 'Render', 'Docker Basics', 'Jira'],
  },
  {
    category: 'Testing and Automation',
    skills: ['Selenium', 'BeautifulSoup', 'Pytest', 'Unit Testing', 'API Testing'],
  },
]

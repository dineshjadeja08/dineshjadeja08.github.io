export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
}

export const experiences: ExperienceItem[] = [
  {
    role: "Python Developer Trainee",
    company: "Manovate Technologies",
    period: "July 2025 – January 2026",
    description: "Worked on Django REST APIs, database integration, backend functionality, debugging and application improvements."
  },
  {
    role: "Python Full Stack Intern",
    company: "UNIQ Technologies",
    period: "July 2024 – December 2024",
    description: "Worked with Python, Django, Flask, REST APIs, MySQL, Git and web-development fundamentals."
  }
];

export const education: EducationItem[] = [
  {
    degree: "Bachelor of Engineering in Computer Science and Engineering",
    institution: "Bharathidasan Engineering College",
    period: "2020 – 2024"
  }
];

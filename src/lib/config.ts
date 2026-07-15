export const siteConfig = {
  name: 'Dinesh Kumar',
  title: 'Freelance Web Developer',
  alternativeTitle: 'Web Developer & Digital Product Builder',
  location: 'Tirupattur, Tamil Nadu, India',
  email: import.meta.env.VITE_EMAIL || 'hello@dineshkumar.dev',
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '910000000000',
  linkedinUrl: import.meta.env.VITE_LINKEDIN_URL || '#',
  githubUrl: import.meta.env.VITE_GITHUB_URL || '#',
  instagramUrl: import.meta.env.VITE_INSTAGRAM_URL || '#',
  formEndpoint: import.meta.env.VITE_FORMSPREE_ENDPOINT || '',
}

export function whatsappUrl(message = 'Hi Dinesh, I want to discuss a project with you.') {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`
}

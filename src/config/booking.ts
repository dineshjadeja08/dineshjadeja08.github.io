export const bookingLinks = {
  discovery: {
    title: 'Free Discovery Call',
    duration: '30 minutes',
    description: 'Discuss your business, project requirements, budget, timeline and next steps.',
    url: import.meta.env.VITE_CAL_30MIN_LINK || 'https://cal.com/dineshkumarc/30min',
  },

  consultation: {
    title: 'Quick Consultation',
    duration: '15 minutes',
    description: 'A short introductory call for questions, website advice or small requirements.',
    url: import.meta.env.VITE_CAL_15MIN_LINK || 'https://cal.com/dineshkumarc/15min',
  },
}

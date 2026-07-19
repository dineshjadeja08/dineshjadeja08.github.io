export const bookingLinks = {
  discovery: {
    title: "Free Discovery Call",
    duration: "30 minutes",
    description:
      "Best for discussing a new website, redesign, e-commerce platform, SaaS product or custom application.",
    url:
      import.meta.env.VITE_CAL_30MIN_LINK ||
      "https://cal.com/dineshkumarc/30min",
  },
  consultation: {
    title: "Quick Consultation",
    duration: "15 minutes",
    description:
      "Best for a quick question, a small requirement or an introductory conversation.",
    url:
      import.meta.env.VITE_CAL_15MIN_LINK ||
      "https://cal.com/dineshkumarc/15min",
  },
};

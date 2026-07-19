export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqs: FAQItem[] = [
  {
    id: "cost",
    question: "How much does a website cost?",
    answer: "The cost depends on the number of pages, functionality, design complexity and required integrations. After understanding the project, I will provide a clear scope and quotation."
  },
  {
    id: "duration",
    question: "How long does it take to build a website?",
    answer: "A simple business website may take around one to three weeks. Larger e-commerce or custom web-application projects require more time depending on the features and feedback process."
  },
  {
    id: "updates",
    question: "Can I update the content later?",
    answer: "Yes. Depending on your needs, I can build an admin panel or connect a content-management system so products, images, prices and page content can be updated."
  },
  {
    id: "hosting",
    question: "Do you provide domain and hosting support?",
    answer: "Yes. I can help select a suitable platform, connect the domain, configure deployment and launch the website."
  },
  {
    id: "mobile",
    question: "Will the website work on mobile?",
    answer: "Yes. Mobile responsiveness is included from the beginning, and the main pages and interactions will be tested across common screen sizes."
  },
  {
    id: "redesign",
    question: "Can you redesign my current website?",
    answer: "Yes. I can review the existing website, improve the design and structure, and rebuild it with a more modern and responsive experience."
  },
  {
    id: "dashboards",
    question: "Do you build admin dashboards?",
    answer: "Yes. I can build dashboards for managing products, enquiries, users, content, inventory and other business data."
  },
  {
    id: "after-launch",
    question: "What happens after the website is launched?",
    answer: "I provide agreed post-launch support for fixing launch issues, small adjustments and guidance on managing the website."
  }
];

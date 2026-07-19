export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatarUrl?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Rajesh Yadav",
    role: "Founder",
    company: "GRF Growths",
    content: "Dinesh is very professional and delivered the website before the deadline. Highly recommended!",
    rating: 5
  },
  {
    id: "2",
    name: "Anjali Sharma",
    role: "Product Manager",
    company: "CAVVE",
    content: "Great communication and understanding of our requirements. The website looks amazing!",
    rating: 5
  },
  {
    id: "3",
    name: "Vikram Singh",
    role: "CTO",
    company: "Unidyne",
    content: "He understands the modern design trends and builds fast and responsive websites.",
    rating: 5
  }
];

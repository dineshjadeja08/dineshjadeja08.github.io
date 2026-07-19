import { siteConfig } from '../config/site';

/**
 * Generates a wa.me URL if VITE_WHATSAPP_NUMBER is configured.
 * Automatically strips invalid characters (+, spaces, hyphens, brackets).
 */
export const getWhatsAppLink = (message?: string): string | null => {
  const number = siteConfig.whatsappNumber;
  if (!number || number.trim() === '') {
    return null;
  }

  // Strip +, spaces, brackets, hyphens
  const cleanNumber = number.replace(/[+\s\(\)\-]/g, '');

  if (!cleanNumber) {
    return null;
  }

  const text = message || "Hi Dinesh, I found your portfolio and would like to discuss a website or web-development project.";
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
};

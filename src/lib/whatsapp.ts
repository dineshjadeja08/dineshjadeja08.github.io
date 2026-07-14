import { grfContact } from '../features/data/grfFallback'

const configuredNumber = import.meta.env.VITE_GRF_WHATSAPP_NUMBER || grfContact.phoneNumber

export function createWhatsAppUrl(message: string) {
  return createWhatsAppUrlForNumber(configuredNumber, message)
}

export function normalizeWhatsAppNumber(phoneNumber: string) {
  return phoneNumber.replace(/[^\d]/g, '')
}

export function createWhatsAppUrlForNumber(phoneNumber: string, message: string) {
  return `https://wa.me/${normalizeWhatsAppNumber(phoneNumber)}?text=${encodeURIComponent(message)}`
}

export function createBirdWhatsAppMessage(input: { birdCode: string; breedName: string; currentUrl?: string }) {
  return `Hello GRF Growths, I'm interested in Bird ID ${input.birdCode}, Breed: ${input.breedName}. Please share its current availability and price. Page: ${input.currentUrl || window.location.href}`
}

export function createBreedWhatsAppMessage(input: { breedName: string; currentUrl?: string }) {
  return `Hello GRF Growths, I'm interested in the ${input.breedName} breed. Please share available birds and prices. Page: ${input.currentUrl || window.location.href}`
}

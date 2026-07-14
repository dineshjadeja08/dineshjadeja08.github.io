import { describe, expect, it } from 'vitest'
import {
  createBirdWhatsAppMessage,
  createBreedWhatsAppMessage,
  createWhatsAppUrlForNumber,
  normalizeWhatsAppNumber,
} from './whatsapp'

describe('whatsapp helpers', () => {
  it('normalizes phone numbers for wa.me links', () => {
    expect(normalizeWhatsAppNumber('+91 99529-08818')).toBe('919952908818')
  })

  it('encodes WhatsApp messages safely', () => {
    const url = createWhatsAppUrlForNumber('+91 99529 08818', 'Hello GRF Growths, price for GRF-101?')

    expect(url).toBe('https://wa.me/919952908818?text=Hello%20GRF%20Growths%2C%20price%20for%20GRF-101%3F')
  })

  it('creates bird enquiry copy with the bird id, breed and page', () => {
    expect(createBirdWhatsAppMessage({
      birdCode: 'GRF-101',
      breedName: 'Aseel',
      currentUrl: 'https://example.com/#birds',
    })).toContain('Bird ID GRF-101, Breed: Aseel')
  })

  it('creates breed enquiry copy with the breed name', () => {
    expect(createBreedWhatsAppMessage({
      breedName: 'Nattu Seval',
      currentUrl: 'https://example.com/#breeds',
    })).toContain('Nattu Seval breed')
  })
})

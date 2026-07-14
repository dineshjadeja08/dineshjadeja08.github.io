import { describe, expect, it } from 'vitest'
import { generateStoragePath, validateImageFile } from './imageService'

describe('image service helpers', () => {
  it('accepts jpeg, png and webp files within the size limit', () => {
    expect(() => validateImageFile(new File(['x'], 'bird.webp', { type: 'image/webp' }))).not.toThrow()
    expect(() => validateImageFile(new File(['x'], 'bird.png', { type: 'image/png' }))).not.toThrow()
    expect(() => validateImageFile(new File(['x'], 'bird.jpg', { type: 'image/jpeg' }))).not.toThrow()
  })

  it('rejects unsupported file types', () => {
    expect(() => validateImageFile(new File(['x'], 'bird.gif', { type: 'image/gif' }))).toThrow('JPEG, PNG or WebP')
  })

  it('rejects original files larger than 10 MB', () => {
    const file = new File([new Uint8Array((10 * 1024 * 1024) + 1)], 'large.webp', { type: 'image/webp' })

    expect(() => validateImageFile(file)).toThrow('10 MB')
  })

  it('generates stable folder-specific storage paths', () => {
    expect(generateStoragePath({ kind: 'bird', birdCode: 'GRF-101' }, 'abc')).toBe('birds/GRF-101/abc.webp')
    expect(generateStoragePath({ kind: 'gallery', category: 'farm' }, 'abc')).toBe('gallery/farm/abc.webp')
  })
})

import imageCompression from 'browser-image-compression'
import { storageBucket, supabase } from '../../../lib/supabase'
import type { GalleryCategory } from '../../../types/grf'

const acceptedTypes = ['image/jpeg', 'image/png', 'image/webp']
const maxOriginalBytes = 10 * 1024 * 1024

export type UploadFolder =
  | { kind: 'breed'; slug: string }
  | { kind: 'bird'; birdCode: string }
  | { kind: 'gallery'; category: GalleryCategory }
  | { kind: 'site'; section: 'hero' | 'about' }
  | { kind: 'testimonial' }

export function validateImageFile(file: File) {
  if (!acceptedTypes.includes(file.type)) {
    throw new Error('Upload JPEG, PNG or WebP images only.')
  }

  if (file.size > maxOriginalBytes) {
    throw new Error('Original image must be 10 MB or smaller.')
  }
}

export async function compressImage(file: File) {
  validateImageFile(file)

  return imageCompression(file, {
    maxSizeMB: 1.4,
    maxWidthOrHeight: 1600,
    useWebWorker: true,
    fileType: 'image/webp',
    initialQuality: 0.84,
  })
}

export function generateStoragePath(folder: UploadFolder, filename: string = crypto.randomUUID()) {
  const cleanName = `${filename}.webp`

  if (folder.kind === 'breed') return `breeds/${folder.slug}/${cleanName}`
  if (folder.kind === 'bird') return `birds/${folder.birdCode}/${cleanName}`
  if (folder.kind === 'gallery') return `gallery/${folder.category}/${cleanName}`
  if (folder.kind === 'site') return `site/${folder.section}/${cleanName}`
  return `testimonials/${cleanName}`
}

export async function uploadCompressedImage(file: File, folder: UploadFolder, onProgress?: (status: string) => void) {
  if (!supabase) throw new Error('Supabase is not configured.')
  onProgress?.('Compressing image...')
  const compressed = await compressImage(file)
  const path = generateStoragePath(folder)
  onProgress?.('Uploading image...')

  const { error } = await supabase.storage
    .from(storageBucket)
    .upload(path, compressed, {
      contentType: 'image/webp',
      upsert: false,
    })

  if (error) throw error
  onProgress?.('Upload complete.')
  return path
}

export async function deleteImage(path: string) {
  if (!supabase) throw new Error('Supabase is not configured.')
  const { error } = await supabase.storage.from(storageBucket).remove([path])
  if (error) throw error
}

export function getPublicImageUrl(path: string | null | undefined) {
  if (!path || !supabase) return ''
  return supabase.storage.from(storageBucket).getPublicUrl(path).data.publicUrl
}

export async function replaceImageSafely(input: {
  file: File
  folder: UploadFolder
  oldPath?: string | null
  updateRecord: (newPath: string) => Promise<void>
}) {
  const newPath = await uploadCompressedImage(input.file, input.folder)
  try {
    await input.updateRecord(newPath)
  } catch (error) {
    await deleteImage(newPath).catch(() => undefined)
    throw error
  }

  if (input.oldPath) {
    await deleteImage(input.oldPath).catch(() => undefined)
  }

  return newPath
}

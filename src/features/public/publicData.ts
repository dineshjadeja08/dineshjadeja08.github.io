import { supabase } from '../../lib/supabase'
import { getPublicImageUrl } from '../admin/services/imageService'
import type { Bird, BirdImage, Breed, Faq, GalleryImage } from '../../types/grf'

export type PublicBirdCard = {
  id: string
  name: string
  nameTa: string
  breed: string
  age: string
  weight: string
  color: string
  availability: string
  description: string
  image: string
  images: string[]
  price: string
}

export type PublicBreedCard = {
  name: string
  image: string
  description: string
  traits: string[]
  count: number
}

export async function fetchPublishedBirdCards(): Promise<PublicBirdCard[]> {
  if (!supabase) return []

  const { data, error } = await supabase
    .from('birds')
    .select('*, breeds(id, name, slug, tamil_name), bird_images(*)')
    .eq('is_published', true)
    .neq('status', 'hidden')
    .order('created_at', { ascending: false })

  if (error) throw error

  return ((data || []) as Array<Bird & { breeds?: Breed | null; bird_images?: BirdImage[] }>).map((bird) => {
    const orderedImages = [...(bird.bird_images || [])].sort((a, b) => a.display_order - b.display_order)
    const primary = orderedImages.find((image) => image.is_primary) || orderedImages[0]
    const imageUrls = orderedImages.map((image) => getPublicImageUrl(image.storage_path)).filter(Boolean)

    return {
      id: bird.bird_code,
      name: bird.title,
      nameTa: bird.breeds?.tamil_name || bird.title,
      breed: bird.breeds?.name || 'GRF Growths',
      age: bird.age_months ? `${bird.age_months} months` : 'Confirm on WhatsApp',
      weight: bird.weight_kg ? `${bird.weight_kg} kg` : 'Confirm on WhatsApp',
      color: bird.colour || 'Confirm on WhatsApp',
      availability: bird.status,
      description: bird.description || 'Contact GRF Growths for current details.',
      image: primary ? getPublicImageUrl(primary.storage_path) : '',
      images: imageUrls,
      price: bird.price ? `₹${bird.price}` : 'Contact for Price',
    }
  })
}

export async function fetchPublishedBreedCards(): Promise<PublicBreedCard[]> {
  if (!supabase) return []

  const { data, error } = await supabase
    .from('breeds')
    .select('*, birds(id, is_published, status)')
    .eq('is_published', true)
    .order('display_order')

  if (error) throw error

  return ((data || []) as Array<Breed & { birds?: Array<Pick<Bird, 'id' | 'is_published' | 'status'>> }>).map((breed) => ({
    name: breed.name,
    image: getPublicImageUrl(breed.cover_image_path) || '',
    description: breed.short_description || breed.full_description || 'Contact GRF Growths for available birds and prices.',
    traits: [breed.tamil_name || 'Tamil-ready', breed.is_featured ? 'Featured' : 'Farm selection', breed.starting_price ? `From ₹${breed.starting_price}` : 'Contact for price'],
    count: (breed.birds || []).filter((bird) => bird.is_published && bird.status !== 'hidden').length,
  }))
}

export async function fetchPublishedGalleryUrls(): Promise<string[]> {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('gallery_images')
    .select('*')
    .eq('is_published', true)
    .order('display_order')

  if (error) throw error
  return ((data || []) as GalleryImage[]).map((image) => getPublicImageUrl(image.storage_path)).filter(Boolean)
}

export async function fetchPublishedFaqs(): Promise<Array<[string, string]>> {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .eq('is_published', true)
    .order('display_order')

  if (error) throw error
  return ((data || []) as Faq[]).filter((faq) => faq.question && faq.answer).map((faq) => [faq.question!, faq.answer!])
}

export async function submitPublicEnquiry(input: {
  customer_name: string
  phone: string
  email?: string
  message: string
  bird_id?: string | null
  breed_id?: string | null
  source?: string
}) {
  if (!supabase) throw new Error('Supabase is not configured. Please use WhatsApp or phone instead.')

  const { error } = await supabase.from('enquiries').insert({
    customer_name: input.customer_name,
    phone: input.phone,
    email: input.email || null,
    message: input.message,
    bird_id: input.bird_id || null,
    breed_id: input.breed_id || null,
    source: input.source || 'public-site',
    status: 'new',
  })

  if (error) throw error
}

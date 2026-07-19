import { supabase } from '../../../lib/supabase'
import type { Bird, BirdImage, Breed, Enquiry, Faq, GalleryImage, SiteSetting, Testimonial } from '../../../types/grf'

function requireClient() {
  if (!supabase) throw new Error('Supabase is not configured.')
  return supabase
}

export async function listBreeds() {
  const { data, error } = await requireClient().from('breeds').select('*').order('display_order').order('created_at', { ascending: false })
  if (error) throw error
  return (data || []) as Breed[]
}

export async function getBreed(id: string) {
  const { data, error } = await requireClient().from('breeds').select('*').eq('id', id).single()
  if (error) throw error
  return data as Breed
}

export async function upsertBreed(values: Partial<Breed> & Pick<Breed, 'name' | 'slug'>) {
  const { data, error } = await requireClient().from('breeds').upsert(values).select('*').single()
  if (error) throw error
  return data as Breed
}

export async function deleteBreed(id: string) {
  const { count, error: countError } = await requireClient().from('birds').select('id', { count: 'exact', head: true }).eq('breed_id', id)
  if (countError) throw countError
  if ((count || 0) > 0) throw new Error(`This breed has ${count} linked bird(s). Reassign or delete those birds first.`)

  const { error } = await requireClient().from('breeds').delete().eq('id', id)
  if (error) throw error
}

export async function listBirds() {
  const { data, error } = await requireClient()
    .from('birds')
    .select('*, breeds(id, name, slug, tamil_name), bird_images(*)')
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data || []) as (Bird & { breeds?: Breed | null; bird_images?: BirdImage[] })[]
}

export async function getBird(id: string) {
  const { data, error } = await requireClient()
    .from('birds')
    .select('*, breeds(id, name, slug, tamil_name), bird_images(*)')
    .eq('id', id)
    .single()
  if (error) throw error
  return data as Bird & { breeds?: Breed | null; bird_images?: BirdImage[] }
}

export async function upsertBird(values: Partial<Bird> & Pick<Bird, 'bird_code' | 'title'>) {
  const { data, error } = await requireClient().from('birds').upsert(values).select('*').single()
  if (error) throw error
  return data as Bird
}

export async function deleteBird(id: string) {
  const { error } = await requireClient().from('birds').delete().eq('id', id)
  if (error) throw error
}

export async function listBirdImages(birdId: string) {
  const { data, error } = await requireClient().from('bird_images').select('*').eq('bird_id', birdId).order('display_order')
  if (error) throw error
  return (data || []) as BirdImage[]
}

export async function addBirdImage(values: Pick<BirdImage, 'bird_id' | 'storage_path'> & Partial<BirdImage>) {
  const { data, error } = await requireClient().from('bird_images').insert(values).select('*').single()
  if (error) throw error
  return data as BirdImage
}

export async function updateBirdImage(id: string, values: Partial<BirdImage>) {
  const { data, error } = await requireClient().from('bird_images').update(values).eq('id', id).select('*').single()
  if (error) throw error
  return data as BirdImage
}

export async function removeBirdImage(id: string) {
  const { error } = await requireClient().from('bird_images').delete().eq('id', id)
  if (error) throw error
}

export async function listGalleryImages() {
  const { data, error } = await requireClient().from('gallery_images').select('*').order('display_order').order('created_at', { ascending: false })
  if (error) throw error
  return (data || []) as GalleryImage[]
}

export async function upsertGalleryImage(values: Pick<GalleryImage, 'storage_path'> & Partial<GalleryImage>) {
  const { data, error } = await requireClient().from('gallery_images').upsert(values).select('*').single()
  if (error) throw error
  return data as GalleryImage
}

export async function deleteGalleryImage(id: string) {
  const { error } = await requireClient().from('gallery_images').delete().eq('id', id)
  if (error) throw error
}

export async function listEnquiries() {
  const { data, error } = await requireClient().from('enquiries').select('*, birds(bird_code, title), breeds(name)').order('created_at', { ascending: false })
  if (error) throw error
  return (data || []) as Enquiry[]
}

export async function updateEnquiry(id: string, values: Partial<Enquiry>) {
  const { data, error } = await requireClient().from('enquiries').update(values).eq('id', id).select('*').single()
  if (error) throw error
  return data as Enquiry
}

export async function listTestimonials() {
  const { data, error } = await requireClient().from('testimonials').select('*').order('display_order')
  if (error) throw error
  return (data || []) as Testimonial[]
}

export async function upsertTestimonial(values: Partial<Testimonial>) {
  const { data, error } = await requireClient().from('testimonials').upsert(values).select('*').single()
  if (error) throw error
  return data as Testimonial
}

export async function deleteTestimonial(id: string) {
  const { error } = await requireClient().from('testimonials').delete().eq('id', id)
  if (error) throw error
}

export async function listFaqs() {
  const { data, error } = await requireClient().from('faqs').select('*').order('display_order')
  if (error) throw error
  return (data || []) as Faq[]
}

export async function upsertFaq(values: Partial<Faq>) {
  const { data, error } = await requireClient().from('faqs').upsert(values).select('*').single()
  if (error) throw error
  return data as Faq
}

export async function deleteFaq(id: string) {
  const { error } = await requireClient().from('faqs').delete().eq('id', id)
  if (error) throw error
}

export async function listSettings() {
  const { data, error } = await requireClient().from('site_settings').select('*').order('setting_key')
  if (error) throw error
  return (data || []) as SiteSetting[]
}

export async function upsertSetting(values: Pick<SiteSetting, 'setting_key' | 'setting_value'> & Partial<SiteSetting>) {
  const { data, error } = await requireClient().from('site_settings').upsert(values, { onConflict: 'setting_key' }).select('*').single()
  if (error) throw error
  return data as SiteSetting
}

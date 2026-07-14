export type AdminRole = 'admin' | 'editor' | 'viewer'

export type BirdStatus = 'available' | 'reserved' | 'sold' | 'hidden'

export type GalleryCategory = 'farm' | 'birds' | 'customers' | 'delivery' | 'general'

export type EnquiryStatus = 'new' | 'contacted' | 'interested' | 'completed' | 'closed'

export type Profile = {
  id: string
  full_name: string | null
  role: AdminRole
  created_at: string
  updated_at: string
}

export type Breed = {
  id: string
  name: string
  slug: string
  tamil_name: string | null
  short_description: string | null
  full_description: string | null
  starting_price: number | null
  cover_image_path: string | null
  is_featured: boolean
  is_published: boolean
  display_order: number
  created_at: string
  updated_at: string
}

export type Bird = {
  id: string
  bird_code: string
  breed_id: string | null
  title: string
  age_months: number | null
  weight_kg: number | null
  colour: string | null
  gender: string | null
  price: number | null
  discount_price: number | null
  description: string | null
  status: BirdStatus
  is_featured: boolean
  is_published: boolean
  created_at: string
  updated_at: string
}

export type BirdImage = {
  id: string
  bird_id: string
  storage_path: string
  alt_text: string | null
  is_primary: boolean
  display_order: number
  created_at: string
}

export type GalleryImage = {
  id: string
  storage_path: string
  title: string | null
  alt_text: string | null
  category: GalleryCategory
  is_published: boolean
  display_order: number
  created_at: string
}

export type Enquiry = {
  id: string
  customer_name: string | null
  phone: string | null
  email: string | null
  bird_id: string | null
  breed_id: string | null
  message: string | null
  status: EnquiryStatus
  source: string | null
  created_at: string
  updated_at: string
}

export type Testimonial = {
  id: string
  customer_name: string | null
  location: string | null
  content: string | null
  image_path: string | null
  is_published: boolean
  display_order: number
  created_at: string
}

export type Faq = {
  id: string
  question: string | null
  answer: string | null
  is_published: boolean
  display_order: number
  created_at: string
}

export type SiteSetting = {
  id: string
  setting_key: string
  setting_value: Record<string, unknown>
  updated_at: string
}

export type BirdWithRelations = Bird & {
  breeds?: Pick<Breed, 'id' | 'name' | 'slug' | 'tamil_name'> | null
  bird_images?: BirdImage[]
}

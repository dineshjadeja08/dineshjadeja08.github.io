import type {
  AdminRole,
  BirdStatus,
  EnquiryStatus,
  GalleryCategory,
} from './grf'

type RowBase = {
  id: string
  created_at?: string
}

type GrfTables = {
  profiles: {
    Row: RowBase & { full_name: string | null; role: AdminRole; updated_at: string }
    Insert: { id: string; full_name?: string | null; role?: AdminRole; created_at?: string; updated_at?: string }
    Update: { full_name?: string | null; role?: AdminRole; updated_at?: string }
  }
  breeds: {
    Row: RowBase & {
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
      updated_at: string
    }
    Insert: {
      id?: string
      name: string
      slug: string
      tamil_name?: string | null
      short_description?: string | null
      full_description?: string | null
      starting_price?: number | null
      cover_image_path?: string | null
      is_featured?: boolean
      is_published?: boolean
      display_order?: number
      created_at?: string
      updated_at?: string
    }
    Update: Partial<GrfTables['breeds']['Insert']>
  }
  birds: {
    Row: RowBase & {
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
      updated_at: string
    }
    Insert: {
      id?: string
      bird_code: string
      breed_id?: string | null
      title: string
      age_months?: number | null
      weight_kg?: number | null
      colour?: string | null
      gender?: string | null
      price?: number | null
      discount_price?: number | null
      description?: string | null
      status?: BirdStatus
      is_featured?: boolean
      is_published?: boolean
      created_at?: string
      updated_at?: string
    }
    Update: Partial<GrfTables['birds']['Insert']>
  }
  bird_images: {
    Row: RowBase & { bird_id: string; storage_path: string; alt_text: string | null; is_primary: boolean; display_order: number }
    Insert: { id?: string; bird_id: string; storage_path: string; alt_text?: string | null; is_primary?: boolean; display_order?: number; created_at?: string }
    Update: { storage_path?: string; alt_text?: string | null; is_primary?: boolean; display_order?: number }
  }
  gallery_images: {
    Row: RowBase & { storage_path: string; title: string | null; alt_text: string | null; category: GalleryCategory; is_published: boolean; display_order: number }
    Insert: { id?: string; storage_path: string; title?: string | null; alt_text?: string | null; category?: GalleryCategory; is_published?: boolean; display_order?: number; created_at?: string }
    Update: Partial<GrfTables['gallery_images']['Insert']>
  }
  enquiries: {
    Row: RowBase & {
      customer_name: string | null
      phone: string | null
      email: string | null
      bird_id: string | null
      breed_id: string | null
      message: string | null
      status: EnquiryStatus
      source: string | null
      updated_at: string
    }
    Insert: {
      id?: string
      customer_name?: string | null
      phone?: string | null
      email?: string | null
      bird_id?: string | null
      breed_id?: string | null
      message?: string | null
      status?: EnquiryStatus
      source?: string | null
      created_at?: string
      updated_at?: string
    }
    Update: Partial<GrfTables['enquiries']['Insert']>
  }
  testimonials: {
    Row: RowBase & { customer_name: string | null; location: string | null; content: string | null; image_path: string | null; is_published: boolean; display_order: number }
    Insert: { id?: string; customer_name?: string | null; location?: string | null; content?: string | null; image_path?: string | null; is_published?: boolean; display_order?: number; created_at?: string }
    Update: Partial<GrfTables['testimonials']['Insert']>
  }
  faqs: {
    Row: RowBase & { question: string | null; answer: string | null; is_published: boolean; display_order: number }
    Insert: { id?: string; question?: string | null; answer?: string | null; is_published?: boolean; display_order?: number; created_at?: string }
    Update: Partial<GrfTables['faqs']['Insert']>
  }
  site_settings: {
    Row: { id: string; setting_key: string; setting_value: Record<string, unknown>; updated_at: string }
    Insert: { id?: string; setting_key: string; setting_value?: Record<string, unknown>; updated_at?: string }
    Update: { setting_key?: string; setting_value?: Record<string, unknown>; updated_at?: string }
  }
}

export type Database = {
  public: {
    Tables: GrfTables
    Views: Record<string, never>
    Functions: {
      current_admin_role: {
        Args: Record<string, never>
        Returns: AdminRole | null
      }
      has_admin_role: {
        Args: { allowed_roles: AdminRole[] }
        Returns: boolean
      }
    }
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}

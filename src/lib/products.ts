import { supabase } from './supabase'
import type { Product } from '../data/catalog'
import { products as localCatalog } from '../data/catalog'

export async function fetchDbProducts(): Promise<Product[]> {
  if (!supabase) return localCatalog

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false })

  if (error || !data || data.length === 0) {
    console.error('Error fetching products or none found:', error)
    return localCatalog
  }

  return data.map(mapDbProductToFrontend)
}

export async function fetchDbProductBySlug(slug: string): Promise<Product | null> {
  if (!supabase) return localCatalog.find(p => p.slug === slug) || null

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !data) return localCatalog.find(p => p.slug === slug) || null

  return mapDbProductToFrontend(data)
}

function mapDbProductToFrontend(db: any): Product {
  let color = db.color || 'Onyx'
  let colorHex = db.color_hex || '#000000'
  let details = db.details || ['240 GSM Compact Cotton', 'Boxy oversized fit', 'Structural integrity']

  if (db.slug.includes('black')) {
    color = 'Black'
    colorHex = '#0D0D0D'
  } else if (db.slug.includes('beige')) {
    color = 'Beige'
    colorHex = '#D8CBB8'
  } else if (db.slug.includes('white')) {
    color = 'White'
    colorHex = '#F5F5F2'
  }
  
  if (db.slug.includes('drop001')) {
    details = [
        'Premium heavyweight cotton feel',
        'Relaxed oversized fit',
        'Soft breathable fabric',
        'Drop shoulder silhouette',
        'Minimal chest branding',
        'Everyday comfort',
        'Unisex-inspired modern fit'
    ]
  }

  return {
    id: db.id,
    slug: db.slug,
    name: db.name,
    color,
    colorHex,
    price: db.price_inr,
    compareAt: db.compare_at_inr || undefined,
    fit: db.fit || 'Oversized',
    gsm: db.gsm || '240 GSM',
    sizes: db.sizes || ['S', 'M', 'L', 'XL', 'XXL'],
    stock: db.stock || 10,
    gallery: db.images || [],
    copy: db.description || '',
    details
  }
}

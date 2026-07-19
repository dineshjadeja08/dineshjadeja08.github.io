import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(supabaseUrl!, supabaseServiceRoleKey!)

async function seedDrop001() {
  console.log('--- Initializing Drop 001: The Core Protocol ---')

  // 1. Create Drop 001 Collection
  const { data: collection, error: colError } = await supabase
    .from('collections')
    .upsert({
      slug: 'drop-001',
      title: 'Drop 001: Core Repetition',
      description: 'The foundation of the CAVVE uniform. Minimalist oversized silhouettes in three essential tones.',
      published: true
    }, { onConflict: 'slug' })
    .select()
    .single()

  if (colError) {
    console.error('Collection Error:', colError)
    return
  }

  console.log('✔ Collection established: Drop 001')

  // 2. Define the 3 Tees
  const products = [
    {
      name: 'DROP001 Essential Oversized Tee - Black',
      slug: 'drop001-essential-oversized-tee-black',
      description: 'The DROP001 Essential Oversized Tee is crafted for everyday wear with a modern oversized silhouette and premium heavyweight cotton feel.\n\nDesigned with a relaxed fit, dropped shoulders, and minimal CAVVE branding, this tee delivers effortless styling with elevated comfort.\n\nBuilt for versatility, the DROP001 pairs seamlessly with cargos, denim, trousers, and layered streetwear looks.\n\nMinimal by design.\nEssential by nature.\n\nMade for everyday confidence.',
      price_inr: 1199,
      compare_at_inr: 1799,
      fit: 'Oversized',
      gsm: '240 GSM',
      status: 'active',
      images: [
        '/images/drop001-black-front.png',
        '/images/drop001-black-back.png'
      ],
      collection_id: collection.id
    },
    {
      name: 'DROP001 Essential Oversized Tee - Beige',
      slug: 'drop001-essential-oversized-tee-beige',
      description: 'The DROP001 Essential Oversized Tee is crafted for everyday wear with a modern oversized silhouette and premium heavyweight cotton feel.\n\nDesigned with a relaxed fit, dropped shoulders, and minimal CAVVE branding, this tee delivers effortless styling with elevated comfort.\n\nBuilt for versatility, the DROP001 pairs seamlessly with cargos, denim, trousers, and layered streetwear looks.\n\nMinimal by design.\nEssential by nature.\n\nMade for everyday confidence.',
      price_inr: 1199,
      compare_at_inr: 1799,
      fit: 'Oversized',
      gsm: '240 GSM',
      status: 'active',
      images: [
        '/images/drop001-beige-front.png',
        '/images/drop001-beige-back.png'
      ],
      collection_id: collection.id
    },
    {
      name: 'DROP001 Essential Oversized Tee - White',
      slug: 'drop001-essential-oversized-tee-white',
      description: 'The DROP001 Essential Oversized Tee is crafted for everyday wear with a modern oversized silhouette and premium heavyweight cotton feel.\n\nDesigned with a relaxed fit, dropped shoulders, and minimal CAVVE branding, this tee delivers effortless styling with elevated comfort.\n\nBuilt for versatility, the DROP001 pairs seamlessly with cargos, denim, trousers, and layered streetwear looks.\n\nMinimal by design.\nEssential by nature.\n\nMade for everyday confidence.',
      price_inr: 1199,
      compare_at_inr: 1799,
      fit: 'Oversized',
      gsm: '240 GSM',
      status: 'active',
      images: [
        '/images/drop001-white-front.png',
        '/images/drop001-white-back.png'
      ],
      collection_id: collection.id
    }
  ]

  // 3. Upsert Products
  for (const prod of products) {
    const { error: prodError } = await supabase
      .from('products')
      .upsert(prod, { onConflict: 'slug' })
    
    if (prodError) {
      console.error(`Error seeding ${prod.name}:`, prodError)
    } else {
      console.log(`✔ Product synchronized: ${prod.name}`)
    }
  }

  console.log('--- Drop 001 Synchronization Complete ---')
}

seedDrop001()

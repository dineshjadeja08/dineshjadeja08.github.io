export type Product = {
  id: string
  slug: string
  name: string
  color: string
  colorHex: string
  price: number
  compareAt?: number
  fit: string
  gsm: string
  sizes: string[]
  stock: number
  gallery: string[]
  copy: string
  details: string[]
}

const photo = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1000&q=88`

export const products: Product[] = [
  {
    id: 'mango-heirloom',
    slug: 'heirloom-mango-pickle',
    name: 'Heirloom Mango Pickle',
    color: 'Fiery & Tangy',
    colorHex: '#C1121F',
    price: 349,
    compareAt: 399,
    fit: 'Bestseller',
    gsm: '300g Jar',
    sizes: ['300g', '500g', '1kg'],
    stock: 82,
    gallery: [photo('photo-1589135233689-bd923934b746'), photo('photo-1589927986089-35812388d1f4')],
    copy: 'Raw summer mangoes, cold-pressed mustard oil and a family masala that has travelled through four generations. Slow-marinated in small batches for a bright, bold finish.',
    details: ['Hand-cut raw mangoes', 'Cold-pressed mustard oil', 'No artificial preservatives', 'Small-batch clay pot marination'],
  },
  {
    id: 'garlic-fire',
    slug: 'fire-roasted-garlic-pickle',
    name: 'Fire-Roasted Garlic',
    color: 'Bold & Smoky',
    colorHex: '#D4A017',
    price: 379,
    fit: 'Craft Batch',
    gsm: '300g Jar',
    sizes: ['300g', '500g'],
    stock: 47,
    gallery: [photo('photo-1615477550927-6ec8445fcf26'), photo('photo-1601050690597-df0568f70950')],
    copy: 'Whole garlic cloves gently roasted and folded into our house spice blend. Rich, smoky and unapologetically generous beside a warm bowl of dal.',
    details: ['Whole roasted garlic', 'Stone-ground spice blend', 'Naturally preserved', 'Deep savoury finish'],
  },
  {
    id: 'lemon-sunshine',
    slug: 'sun-cured-lemon-pickle',
    name: 'Sun-Cured Lemon',
    color: 'Bright & Zesty',
    colorHex: '#E9B949',
    price: 329,
    fit: 'Grandma’s Recipe',
    gsm: '300g Jar',
    sizes: ['300g', '500g', '1kg'],
    stock: 65,
    gallery: [photo('photo-1590502593747-42a996133562'), photo('photo-1590080875515-8a3a8dc5735e')],
    copy: 'Juicy lemons rested under the sun until their edges soften and their flavour deepens. A golden, zesty pantry essential with an old-world soul.',
    details: ['Sun-cured lemons', 'Balanced tang and spice', 'Traditional slow method', 'Pairs with curd rice and parathas'],
  },
  {
    id: 'gongura-leaf',
    slug: 'andhra-gongura-pickle',
    name: 'Andhra Gongura',
    color: 'Earthy & Spicy',
    colorHex: '#1B4332',
    price: 359,
    fit: 'Regional Classic',
    gsm: '300g Jar',
    sizes: ['300g', '500g'],
    stock: 54,
    gallery: [photo('photo-1512621776951-a57141f2eefd'), photo('photo-1547592180-85f173990554')],
    copy: 'Tart gongura leaves cooked low and slow with red chilli, garlic and sesame. A soulful Andhra favourite made for hot rice and a quiet spoon of ghee.',
    details: ['Fresh sorrel leaves', 'Andhra-style spice profile', 'Cooked in small batches', 'No synthetic colours'],
  },
  {
    id: 'chicken-country',
    slug: 'country-chicken-pickle',
    name: 'Country Chicken Pickle',
    color: 'Rich & Fiery',
    colorHex: '#8C1C13',
    price: 549,
    fit: 'Weekend Special',
    gsm: '250g Jar',
    sizes: ['250g', '500g'],
    stock: 32,
    gallery: [photo('photo-1601050690117-94f5f6fa8bd7'), photo('photo-1569058242253-92a9c755a0ec')],
    copy: 'Tender country chicken cooked with curry leaves, chilli and roasted spices until every bite carries the warmth of a Sunday family table.',
    details: ['Tender boneless chicken', 'Fresh curry leaves', 'Slow cooked masala', 'Refrigerate after opening'],
  },
  {
    id: 'mixed-garden',
    slug: 'garden-mixed-pickle',
    name: 'Garden Mixed Pickle',
    color: 'Classic & Crunchy',
    colorHex: '#A3541E',
    price: 339,
    fit: 'Family Favourite',
    gsm: '300g Jar',
    sizes: ['300g', '500g', '1kg'],
    stock: 74,
    gallery: [photo('photo-1601493700631-2b16ec4b4716'), photo('photo-1506807803488-8eafc15316c7')],
    copy: 'A cheerful mix of seasonal vegetables, raw mango and lime. Crunchy, familiar and made to earn a permanent place at the dining table.',
    details: ['Seasonal vegetables', 'Freshly ground spices', 'Naturally matured', 'Everyday table pickle'],
  },
]

export const journalPosts = [
  { title: 'Why We Still Wait For The Sun', date: 'Our Process', excerpt: 'Some flavours refuse to be rushed. A note on our patient, traditional methods.' },
  { title: 'A Jar That Travels Home', date: 'From The Community', excerpt: 'How a familiar spoonful becomes a small bridge across cities and continents.' },
  { title: 'The Mango Season Ritual', date: 'Kitchen Notes', excerpt: 'Every summer begins with baskets, cotton cloth and the fragrance of mustard oil.' },
]

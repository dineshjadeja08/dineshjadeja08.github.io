import { Heart, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Product } from '../data/catalog'
import { formatInr } from '../lib/utils'
import { useCommerceStore } from '../store/cart'

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, wishlist } = useCommerceStore()
  const saved = wishlist.includes(product.id)
  return <article className="pantry-card">
    <Link className="pantry-card-image" to={`/products/${product.slug}`}>
      <img src={product.gallery[0]} alt={product.name} loading="lazy" />
      <span>{product.fit}</span>
    </Link>
    <button className={`pantry-save ${saved ? 'active' : ''}`} onClick={() => toggleWishlist(product.id)} aria-label={`Save ${product.name}`}><Heart size={15} fill={saved ? 'currentColor' : 'none'} /></button>
    <div className="pantry-card-copy">
      <small>{product.color} · {product.gsm}</small>
      <Link to={`/products/${product.slug}`}><h3>{product.name}</h3></Link>
      <div><strong>{formatInr(product.price)}</strong><button onClick={() => addToCart(product, product.sizes[0])}>Add jar <Plus size={14} /></button></div>
    </div>
  </article>
}

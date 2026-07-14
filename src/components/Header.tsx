import { AnimatePresence, motion } from 'framer-motion'
import { Heart, Leaf, Menu, Search, ShoppingBag, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useCommerceStore } from '../store/cart'
import { CartDrawer } from './CartDrawer'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { cart, wishlist, isCartOpen, openCart, closeCart } = useCommerceStore()
  const { pathname } = useLocation()
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    const timer = window.setTimeout(() => setMenuOpen(false), 0)
    return () => window.clearTimeout(timer)
  }, [pathname])

  return <>
    <div className="atchi-note">Free delivery above ₹799 <i /> Handmade in small batches <i /> Dispatches in 2-3 days</div>
    <header className={`atchi-header ${scrolled ? 'scrolled' : ''}`}>
      <nav className="atchi-nav atchi-nav-left">
        <NavLink to="/shop">Pantry</NavLink><NavLink to="/about">Our roots</NavLink>
      </nav>
      <Link className="atchi-logo" to="/"><Leaf size={18} /><strong>atchi</strong><span>pickles & preserves</span></Link>
      <nav className="atchi-nav atchi-nav-right">
        <NavLink to="/journal">Journal</NavLink><a href="/#ritual">The ritual</a>
      </nav>
      <div className="atchi-tools">
        <Link to="/search" aria-label="Search pantry"><Search size={18} /></Link>
        <Link to="/wishlist" aria-label="Saved jars"><Heart size={18} />{wishlist.length > 0 && <b>{wishlist.length}</b>}</Link>
        <button onClick={openCart} aria-label="Open cart"><ShoppingBag size={18} />{cartCount > 0 && <b>{cartCount}</b>}</button>
        <button className="atchi-menu-btn" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu size={20} /></button>
      </div>
    </header>
    <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
    <AnimatePresence>
      {menuOpen && <motion.aside className="atchi-mobile-menu" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 26 }}>
        <button onClick={() => setMenuOpen(false)} aria-label="Close menu"><X /></button>
        <span>Open the pantry</span>
        <Link to="/shop">Shop all jars</Link><Link to="/about">Our roots</Link><a href="/#ritual">The ritual</a><Link to="/journal">Kitchen journal</Link><Link to="/account">Your account</Link>
      </motion.aside>}
    </AnimatePresence>
  </>
}

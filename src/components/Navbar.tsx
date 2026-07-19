import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { BookCallButton } from './booking/BookCallButton'
import { useScrollLock } from '../hooks/useScrollLock'

const navItems = [
  { label: 'Home', href: '/#home' },
  { label: 'About', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Work', href: '/projects' },
  { label: 'Process', href: '/#process' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Contact', href: '/#contact' },
]

function handleHashNavigation(href: string, close?: () => void) {
  close?.()
  if (href.startsWith('/#')) {
    window.setTimeout(() => document.querySelector(href.replace('/', ''))?.scrollIntoView({ behavior: 'smooth' }), 0)
  }
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  useScrollLock(open)

  return (
    <header className="topbar">
      <Link className="brand" to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <span className="brand-mark">D</span>
        <span>
          <strong>Dinesh Kumar</strong>
          <small>Freelance Web Developer</small>
        </span>
      </Link>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map((item) =>
          item.href === '/projects' ? (
            <NavLink key={item.label} to="/projects" className={({ isActive }) => (isActive ? 'active' : '')}>
              {item.label}
            </NavLink>
          ) : (
            <Link
              className={location.pathname === '/' && location.hash === item.href.slice(1) ? 'active' : ''}
              key={item.label}
              to={item.href}
              onClick={() => handleHashNavigation(item.href)}
            >
              {item.label}
            </Link>
          ),
        )}
      </nav>

      <div className="nav-actions">
        <BookCallButton type="selector" label="Book a Call" className="nav-call" />
        <button className="menu-button" type="button" onClick={() => setOpen(true)} aria-label="Open navigation menu">
          <Menu size={22} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.aside initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', bounce: 0, duration: 0.35 }}>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close navigation menu">
                <X size={22} />
              </button>
              {navItems.map((item) => (
                <Link key={item.label} to={item.href} onClick={() => handleHashNavigation(item.href, () => setOpen(false))}>
                  {item.label}
                </Link>
              ))}
              <BookCallButton type="selector" label="Book a Call" className="primary-button" />
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

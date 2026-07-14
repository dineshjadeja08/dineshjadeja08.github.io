import {
  Bird,
  ChevronRight,
  HelpCircle,
  Image,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  Shield,
  Tags,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useAdminAuth } from '../auth/AdminAuthContext'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/breeds', label: 'Breeds', icon: Tags },
  { to: '/admin/birds', label: 'Birds', icon: Bird },
  { to: '/admin/gallery', label: 'Gallery', icon: Image },
  { to: '/admin/enquiries', label: 'Enquiries', icon: MessageSquare },
  { to: '/admin/testimonials', label: 'Testimonials', icon: Shield },
  { to: '/admin/faqs', label: 'FAQs', icon: HelpCircle },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
]

export function AdminLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { profile, role, signOut } = useAdminAuth()
  const location = useLocation()
  const crumb = location.pathname.split('/').filter(Boolean).slice(1)

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <AdminNav onNavigate={() => setDrawerOpen(false)} />
      </aside>

      {drawerOpen && (
        <div className="admin-drawer">
          <button type="button" className="admin-icon-button" onClick={() => setDrawerOpen(false)} aria-label="Close admin navigation">
            <X />
          </button>
          <AdminNav onNavigate={() => setDrawerOpen(false)} />
        </div>
      )}

      <div className="admin-main-shell">
        <header className="admin-topbar">
          <button type="button" className="admin-icon-button admin-drawer-trigger" onClick={() => setDrawerOpen(true)} aria-label="Open admin navigation">
            <Menu />
          </button>
          <div className="admin-breadcrumbs">
            <span>Admin</span>
            {crumb.map((item) => (
              <span key={item}><ChevronRight size={14} /> {item.replace(/-/g, ' ')}</span>
            ))}
          </div>
          <div className="admin-user">
            <div>
              <strong>{profile?.full_name || 'GRF user'}</strong>
              <span>{role}</span>
            </div>
            <button type="button" className="admin-icon-button" onClick={() => void signOut()} aria-label="Logout">
              <LogOut />
            </button>
          </div>
        </header>
        <Outlet />
      </div>
    </div>
  )
}

function AdminNav({ onNavigate }: { onNavigate: () => void }) {
  return (
    <nav className="admin-nav" aria-label="Admin navigation">
      <a className="admin-logo" href="/">
        <img src="/grf/logo-4JgaR4R9.png" alt="" />
        <span>GRF Admin</span>
      </a>
      {navItems.map(({ to, label, icon: Icon, end }) => (
        <NavLink key={to} to={to} end={end} onClick={onNavigate}>
          <Icon size={18} /> {label}
        </NavLink>
      ))}
    </nav>
  )
}

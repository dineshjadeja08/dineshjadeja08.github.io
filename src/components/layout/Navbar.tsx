import { useEffect, useState } from 'react';
import type { MouseEvent } from 'react';
import { Calendar, Menu, X } from 'lucide-react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useBooking } from '../../hooks/useBooking';

const navItems = [
  { label: 'About', hash: '#about' },
  { label: 'Services', hash: '#services' },
  { label: 'Work', hash: '#work' },
  { label: 'Process', hash: '#process' },
  { label: 'Pricing', hash: '#pricing' },
  { label: 'Reviews', hash: '#reviews' },
  { label: 'FAQ', hash: '#faq' },
  { label: 'Contact', hash: '#contact' }
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { openBooking } = useBooking();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.hash.slice(1));

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (location.pathname !== '/') return;

      if (window.scrollY < 80) {
        setActiveSection('');
        return;
      }

      let current = '';
      let closestTop = Number.NEGATIVE_INFINITY;
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        const top = element?.getBoundingClientRect().top;
        if (typeof top === 'number' && top <= 130 && top > closestTop) {
          current = id;
          closestTop = top;
        }
      }

      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    setIsOpen(false);
    if (location.pathname !== '/') {
      setActiveSection('');
      return;
    }
    setActiveSection(location.hash.replace('#', ''));
  }, [location.pathname, location.hash]);

  const handleHashLinkClick = (e: MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    setIsOpen(false);
    const id = hash.slice(1);

    if (location.pathname !== '/') {
      navigate('/' + hash);
      return;
    }

    const element = document.querySelector(hash);
    if (element) {
      window.history.replaceState(null, '', hash);
      setActiveSection(id);
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeClass = 'text-brand-peach font-bold active-nav-link';
  const inactiveClass = 'text-brand-muted hover:text-brand-text font-medium transition-colors duration-200 underline-hover';
  const isHashActive = (hash: string) => location.pathname === '/' && activeSection === hash.slice(1);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-brand-bg/90 backdrop-blur-md border-b border-brand-border py-4 shadow-xs'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center space-x-2 group"
        >
          <span className="dk-logo-mark" aria-hidden="true" />
          <div className="flex flex-col text-left">
            <span className="font-heading font-extrabold text-brand-text text-sm leading-tight tracking-tight uppercase">
              DINESH KUMAR
            </span>
            <span className="text-[9px] font-semibold tracking-normal text-brand-muted leading-none">
              Freelance Web Developer
            </span>
          </div>
        </Link>

        <nav className="hidden xl:flex items-center space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) => `${isActive && activeSection === '' ? activeClass : inactiveClass} text-xs`}
          >
            Home
          </NavLink>
          {navItems.map((item) => (
            <a
              key={item.hash}
              href={item.hash}
              onClick={(e) => handleHashLinkClick(e, item.hash)}
              className={`${isHashActive(item.hash) ? activeClass : inactiveClass} text-xs`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <button
            onClick={openBooking}
            className="inline-flex items-center px-4 py-2 bg-brand-text hover:bg-brand-peach text-white font-heading font-semibold rounded-brand-sm text-xs transition-all duration-200 active:scale-95 shadow-xs"
          >
            <Calendar className="w-3.5 h-3.5 mr-2" />
            <span>Book a Free Call</span>
          </button>
        </div>

        <button
          onClick={toggleMenu}
          className="xl:hidden p-2 rounded-brand-sm text-brand-text hover:bg-brand-secondary focus:outline-none"
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div
        className={`fixed inset-0 top-[60px] bg-brand-bg border-t border-brand-border z-30 transition-transform duration-300 xl:hidden flex flex-col justify-between p-6 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="flex flex-col space-y-5 text-left mt-4">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className="font-heading font-bold text-xl text-brand-text hover:text-brand-peach transition-colors"
          >
            Home
          </NavLink>
          {navItems.map((item) => (
            <a
              key={item.hash}
              href={item.hash}
              onClick={(e) => handleHashLinkClick(e, item.hash)}
              className={`font-heading font-bold text-xl transition-colors ${
                isHashActive(item.hash) ? 'text-brand-peach' : 'text-brand-text hover:text-brand-peach'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="space-y-4 mb-4">
          <button
            onClick={() => {
              setIsOpen(false);
              openBooking();
            }}
            className="flex items-center justify-center w-full py-3 bg-brand-text text-white font-heading font-bold rounded-brand-sm transition-all active:scale-[0.98]"
          >
            <Calendar className="w-5 h-5 mr-2" />
            <span>Book a Free Call</span>
          </button>

          <div className="text-center">
            <span className="text-xs text-brand-muted block">
              Tirupattur, Tamil Nadu, India
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

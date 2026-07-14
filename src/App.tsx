import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  Bird,
  Camera,
  ChevronLeft,
  ChevronRight,
  Clock,
  HeartPulse,
  Languages,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Truck,
  X,
} from 'lucide-react'
import { lazy, Suspense, useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import { AdminAuthProvider } from './features/admin/auth/AdminAuthContext'
import { AdminLoginPage } from './features/admin/auth/AdminLoginPage'
import { ProtectedAdminRoute } from './features/admin/auth/ProtectedAdminRoute'
import { AdminLayout } from './features/admin/layout/AdminLayout'
import { AdminDashboardPage } from './features/admin/pages/AdminDashboardPage'
import {
  fetchPublishedBirdCards,
  fetchPublishedBreedCards,
  fetchPublishedFaqs,
  fetchPublishedGalleryUrls,
  submitPublicEnquiry,
} from './features/public/publicData'
import './index.css'

gsap.registerPlugin(ScrollTrigger)

type Language = 'en' | 'ta'

type BirdProduct = {
  id: string
  name: string
  nameTa: string
  breed: string
  age: string
  weight: string
  color: string
  availability: string
  description: string
  image: string
  images: string[]
}

type EnquiryBird = Pick<BirdProduct, 'id' | 'breed'>

const asset = (name: string) => `/grf/${name}`

const phoneDisplay = '+91 99529 08818'
const phoneHref = 'tel:919952908818'
const whatsappBase = 'https://wa.me/919952908818'
const email = 'grf.entrepreneur@gmail.com'
const instagram = 'https://www.instagram.com/guru_rooster/'
const maps = 'https://maps.app.goo.gl/gRkaQ4JexHB9AtSr6'
const address = 'No.81, Mankanoor, Puthagaram, Tamil Nadu 635602'

const images = {
  logo: asset('logo-4JgaR4R9.png'),
  hero: asset('rooster-DKRdJkRI.png'),
  owner: asset('grf-growths-BxKbR06g.jpeg'),
  country: asset('country-rooster-healthy-BE_yBY8W.jpg'),
  premium: asset('premium-country-chicken-D0OK7IQi.jpg'),
  natural: asset('natural-rooster-farm-raised-vL3aDpk5.jpg'),
  organic: asset('organic-country-chicken-india-O2hV7Tce.jpg'),
  lifestyle: asset('chicken-farm-natural-lifestyle-6dUFDO1Q.jpg'),
  feeding: asset('rooster-feeding-time-DJVJ_DxZ.jpg'),
  coop: asset('poultry-farm-clean-environment-DztljUL_.jpg'),
  farm1: asset('IMG-20241007-WA0097-KZT46xi1.jpg'),
  farm2: asset('IMG-20241007-WA0105-D9kpILdD.jpg'),
  farm3: asset('IMG_20260125_145314-Dus9q3wI.jpg'),
  farm4: asset('IMG_20260125_145322-DfHrXkbf.jpg'),
  farm5: asset('IMG_20260125_145323-CoMDJM9t.jpg'),
}

const birds: BirdProduct[] = [
  {
    id: 'GRF-101',
    name: 'Country White Rooster',
    nameTa: 'நாட்டு வெள்ளை சேவல்',
    breed: 'Country White',
    age: '6-8 months',
    weight: 'Confirm on WhatsApp',
    color: 'White country feathering',
    availability: 'Available',
    description: 'Strong country breed raised with natural feed and careful daily handling.',
    image: images.country,
    images: [images.country, images.farm1, images.coop],
  },
  {
    id: 'GRF-102',
    name: 'Aseel Breed',
    nameTa: 'ஆசீல் இனம்',
    breed: 'Aseel',
    age: '7-10 months',
    weight: 'Confirm on WhatsApp',
    color: 'Deep red and dark tones',
    availability: 'Popular',
    description: 'A powerful rooster type known for confident build, stamina and presence.',
    image: images.premium,
    images: [images.premium, images.farm2, images.feeding],
  },
  {
    id: 'GRF-103',
    name: 'Kili / Seval Breed',
    nameTa: 'கிளி / சேவல் இனம்',
    breed: 'Kili Seval',
    age: '6-8 months',
    weight: 'Confirm on WhatsApp',
    color: 'Natural mixed plumage',
    availability: 'Available',
    description: 'Naturally raised with good care, steady feeding and active movement.',
    image: images.natural,
    images: [images.natural, images.farm3, images.lifestyle],
  },
  {
    id: 'GRF-104',
    name: 'Nattu Seval',
    nameTa: 'நாட்டு சேவல்',
    breed: 'Nattu Seval',
    age: '8-12 months',
    weight: 'Confirm on WhatsApp',
    color: 'Traditional country tones',
    availability: 'Available',
    description: 'Traditional country rooster type suited for farmers and rooster lovers.',
    image: images.organic,
    images: [images.organic, images.farm4, images.coop],
  },
  {
    id: 'GRF-105',
    name: 'Kadaknath',
    nameTa: 'கடக்நாத்',
    breed: 'Kadaknath',
    age: '8-10 months',
    weight: 'Confirm on WhatsApp',
    color: 'Dark feathering',
    availability: 'Contact to confirm',
    description: 'Distinct dark-feathered bird category; current availability changes quickly.',
    image: images.lifestyle,
    images: [images.lifestyle, images.farm5, images.feeding],
  },
  {
    id: 'GRF-106',
    name: 'Giriraja Breed',
    nameTa: 'கிரிராஜா இனம்',
    breed: 'Giriraja',
    age: '5-7 months',
    weight: 'Confirm on WhatsApp',
    color: 'Brown and gold tones',
    availability: 'Available',
    description: 'Hardy and fast-growing bird type suitable for village farming needs.',
    image: images.feeding,
    images: [images.feeding, images.country, images.coop],
  },
]

const breedShowcase = [
  {
    name: 'Aseel',
    image: images.premium,
    description: 'Powerful build, alert posture and strong demand among premium rooster buyers.',
    traits: ['Strong frame', 'Confident stance', 'Premium demand'],
  },
  {
    name: 'Nattu Seval',
    image: images.organic,
    description: 'Traditional Tamil Nadu country rooster category raised with natural care.',
    traits: ['Country type', 'Farm-raised', 'Trusted locally'],
  },
  {
    name: 'Country White',
    image: images.country,
    description: 'Clean white feathering and steady farm conditioning for direct buyers.',
    traits: ['White plumage', 'Natural feed', 'Direct support'],
  },
  {
    name: 'Kili Seval',
    image: images.natural,
    description: 'A lively bird category with natural movement and practical village-farm appeal.',
    traits: ['Active bird', 'Healthy care', 'Farm selection'],
  },
]

const gallery = [
  images.hero,
  images.owner,
  images.country,
  images.premium,
  images.natural,
  images.organic,
  images.feeding,
  images.coop,
  images.farm1,
  images.farm2,
  images.farm3,
  images.farm4,
  images.farm5,
]

const storySteps = [
  ['Carefully selected bloodlines', 'Birds are selected with attention to build, activity and customer requirement.'],
  ['Nutritious feeding', 'Natural feeding routines support healthy growth without shortcuts.'],
  ['Regular health monitoring', 'The farm keeps a close eye on condition before confirming a bird to a customer.'],
  ['Direct customer support', 'Buyers can ask questions directly through WhatsApp before booking.'],
  ['Safe delivery assistance', 'GRF Growths guides customers with practical delivery coordination.'],
]

const whyChoose = [
  ['Healthy birds', 'Birds are raised with daily care, feeding routines and hygiene checks.', HeartPulse],
  ['Trusted bloodlines', 'Breed details and bird condition are discussed transparently before purchase.', ShieldCheck],
  ['Transparent communication', 'Direct WhatsApp support keeps buyers informed before booking.', MessageCircle],
  ['Genuine bird images', 'Customers can request current photos and videos of selected birds.', Camera],
  ['Direct farm support', 'The farm helps customers choose a bird that matches their need.', BadgeCheck],
  ['Delivery guidance', 'Practical support is provided for pickup or delivery coordination.', Truck],
]

const process = ['Selection', 'Feeding', 'Health Monitoring', 'Customer Confirmation', 'Delivery Support']

const faqs = [
  ['How do I check current bird availability?', 'Send a WhatsApp enquiry with the Bird ID. Availability changes, so GRF Growths will confirm the latest status directly.'],
  ['Are prices listed on the website?', 'Prices are kept as Contact for Price because bird age, breed and availability can change.'],
  ['Can I visit the farm?', 'Farm visits can be discussed by phone or WhatsApp before arriving.'],
  ['Is delivery available?', 'GRF Growths provides delivery guidance and coordination support where possible.'],
  ['How do payments work?', 'Payment details are shared directly after the selected bird is confirmed.'],
  ['Can I see the bird condition before booking?', 'Yes. Ask for current images or videos of the selected bird on WhatsApp.'],
  ['How does booking work?', 'Share the Bird ID, confirm availability, discuss price, then follow the booking instructions from GRF Growths.'],
  ['Is advance payment required?', 'Advance payment requirements are confirmed directly during booking.'],
]

const ta = {
  eyebrow: 'சேலம், தமிழ்நாடு',
  heroTitle: 'Premium Bloodlines. Raised with Care.',
  heroCopy: 'Healthy, carefully raised premium roosters from GRF Growths, Salem.',
  whatsapp: 'WhatsApp Enquiry',
  explore: 'Explore Birds',
  introTitle: 'Rooted in practical Tamil Nadu farming.',
  introCopy:
    'GRF Growths is a dedicated rooster farm focused on raising healthy, strong and pure breed birds with natural care, proper nutrition and hygienic farm practices.',
  birds: 'Available Roosters',
  contactPrice: 'Contact for Price',
  testimonials: 'Testimonials will be added after real customer feedback is provided.',
}

function whatsappFor(bird?: EnquiryBird) {
  const text = bird
    ? `Hello GRF Growths, I'm interested in Bird ID ${bird.id}, Breed: ${bird.breed}. Please share its current price and availability.`
    : 'Hello GRF Growths, I want to enquire about available premium roosters. Please share current birds and prices.'
  return `${whatsappBase}?text=${encodeURIComponent(text)}`
}

const queryClient = new QueryClient()
const BreedsPage = lazy(() => import('./features/admin/pages/BreedsPage').then((module) => ({ default: module.BreedsPage })))
const BreedFormPage = lazy(() => import('./features/admin/pages/BreedFormPage').then((module) => ({ default: module.BreedFormPage })))
const BirdsPage = lazy(() => import('./features/admin/pages/BirdsPage').then((module) => ({ default: module.BirdsPage })))
const BirdFormPage = lazy(() => import('./features/admin/pages/BirdFormPage').then((module) => ({ default: module.BirdFormPage })))
const GalleryPage = lazy(() => import('./features/admin/pages/GalleryPage').then((module) => ({ default: module.GalleryPage })))
const EnquiriesPage = lazy(() => import('./features/admin/pages/EnquiriesPage').then((module) => ({ default: module.EnquiriesPage })))
const TestimonialsPage = lazy(() => import('./features/admin/pages/SimpleContentPages').then((module) => ({ default: module.TestimonialsPage })))
const FaqsPage = lazy(() => import('./features/admin/pages/SimpleContentPages').then((module) => ({ default: module.FaqsPage })))
const SettingsPage = lazy(() => import('./features/admin/pages/SimpleContentPages').then((module) => ({ default: module.SettingsPage })))

function PublicSite() {
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [language, setLanguage] = useState<Language>('en')
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [testimonialIndex, setTestimonialIndex] = useState(0)
  const [activeFaq, setActiveFaq] = useState(0)
  const [enquiryForm, setEnquiryForm] = useState({ name: '', phone: '', email: '', message: '', website: '' })
  const [enquiryStatus, setEnquiryStatus] = useState('')
  const [lastEnquiryAt, setLastEnquiryAt] = useState(0)
  const reducedMotion = useReducedMotion()
  const breedTrack = useRef<HTMLDivElement>(null)
  const storyRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const { data: publicBirds = [] } = useQuery({ queryKey: ['public', 'birds'], queryFn: fetchPublishedBirdCards })
  const { data: publicBreeds = [] } = useQuery({ queryKey: ['public', 'breeds'], queryFn: fetchPublishedBreedCards })
  const { data: publicGallery = [] } = useQuery({ queryKey: ['public', 'gallery'], queryFn: fetchPublishedGalleryUrls })
  const { data: publicFaqs = [] } = useQuery({ queryKey: ['public', 'faqs'], queryFn: fetchPublishedFaqs })
  const heroY = useTransform(scrollYProgress, [0, 0.22], [0, reducedMotion ? 0 : 105])
  const heroScale = useTransform(scrollYProgress, [0, 0.22], [1.04, reducedMotion ? 1.04 : 1.14])

  const copy = useMemo(
    () => ({
      eyebrow: language === 'ta' ? ta.eyebrow : 'Salem, Tamil Nadu',
      heroTitle: language === 'ta' ? ta.heroTitle : 'Premium Bloodlines. Raised with Care.',
      heroCopy: language === 'ta' ? ta.heroCopy : 'Healthy, carefully raised premium roosters from GRF Growths, Salem.',
      whatsapp: language === 'ta' ? ta.whatsapp : 'WhatsApp Enquiry',
      explore: language === 'ta' ? ta.explore : 'Explore Birds',
      introTitle: language === 'ta' ? ta.introTitle : 'Rooted in practical Tamil Nadu farming.',
      introCopy:
        language === 'ta'
          ? ta.introCopy
          : 'GRF Growths is a dedicated rooster farm focused on raising healthy, strong and pure breed birds with natural care, proper nutrition and hygienic farm practices.',
      birds: language === 'ta' ? ta.birds : 'Available Roosters',
      contactPrice: language === 'ta' ? ta.contactPrice : 'Contact for Price',
    }),
    [language],
  )

  const birdCards = publicBirds.length > 0 ? publicBirds : birds.map((bird) => ({ ...bird, price: copy.contactPrice }))
  const breedCards = publicBreeds.length > 0
    ? publicBreeds.map((breed) => ({
        ...breed,
        image: breed.image || images.country,
      }))
    : breedShowcase.map((breed) => ({
        ...breed,
        count: birds.filter((bird) => bird.breed.includes(breed.name)).length,
      }))
  const galleryItems = publicGallery.length > 0 ? publicGallery : gallery
  const faqItems = publicFaqs.length > 0 ? publicFaqs : faqs

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 950)
    return () => window.clearTimeout(timer)
  }, [])

  async function handlePublicEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setEnquiryStatus('')

    if (enquiryForm.website) return
    if (Date.now() - lastEnquiryAt < 30000) {
      setEnquiryStatus('Please wait before sending another enquiry.')
      return
    }
    if (enquiryForm.name.trim().length < 2 || enquiryForm.phone.trim().length < 10 || enquiryForm.message.trim().length < 5) {
      setEnquiryStatus('Please enter your name, phone number and message.')
      return
    }

    try {
      await submitPublicEnquiry({
        customer_name: enquiryForm.name.trim(),
        phone: enquiryForm.phone.trim(),
        email: enquiryForm.email.trim(),
        message: enquiryForm.message.trim(),
      })
      setLastEnquiryAt(Date.now())
      setEnquiryForm({ name: '', phone: '', email: '', message: '', website: '' })
      setEnquiryStatus('Enquiry sent. GRF Growths will contact you directly.')
    } catch (error) {
      setEnquiryStatus(error instanceof Error ? error.message : 'Could not send enquiry. Please use WhatsApp.')
    }
  }

  useEffect(() => {
    if (reducedMotion) return
    const lenis = new Lenis({ lerp: 0.08, wheelMultiplier: 0.9 })
    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [reducedMotion])

  useEffect(() => {
    if (reducedMotion) return
    const ctx = gsap.context(() => {
      if (breedTrack.current) {
        const distance = breedTrack.current.scrollWidth - window.innerWidth + 64
        gsap.to(breedTrack.current, {
          x: () => (distance > 0 ? -distance : 0),
          ease: 'none',
          scrollTrigger: {
            trigger: '.breed-showcase',
            start: 'top top',
            end: () => `+=${Math.max(distance, 600)}`,
            pin: true,
            scrub: 0.7,
          },
        })
      }
      if (storyRef.current) {
        gsap.fromTo(
          '.story-copy',
          { opacity: 0.25, y: 38 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.18,
            scrollTrigger: {
              trigger: storyRef.current,
              start: 'top 70%',
              end: 'bottom 35%',
              scrub: 0.8,
            },
          },
        )
      }
      if (progressRef.current) {
        gsap.fromTo(progressRef.current, { scaleX: 0 }, {
          scaleX: 1,
          ease: 'none',
          transformOrigin: 'left center',
          scrollTrigger: {
            trigger: '.process-section',
            start: 'top 75%',
            end: 'bottom 55%',
            scrub: true,
          },
        })
      }
    })
    return () => ctx.revert()
  }, [reducedMotion])

  useEffect(() => {
    const timer = window.setInterval(() => setTestimonialIndex((index) => (index + 1) % 3), 3600)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className="grf-site">
      <HelmetScripts />
      <AnimatePresence>
        {loading && (
          <motion.div className="loader" exit={{ opacity: 0 }} transition={{ duration: 0.45 }}>
            <motion.img src={images.logo} alt="GRF Growths logo" initial={{ scale: 0.78, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} />
            <motion.span initial={{ width: 0 }} animate={{ width: 180 }} transition={{ duration: 0.7, ease: 'easeOut' }} />
          </motion.div>
        )}
      </AnimatePresence>

      <header className="site-header">
        <a className="brand" href="#home" aria-label="GRF Growths home">
          <img src={images.logo} alt="" />
          <span>GRF Growths</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {['Birds', 'Breeds', 'Gallery', 'FAQ', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>
          ))}
        </nav>
        <div className="header-actions">
          <button className="icon-button" type="button" onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')} aria-label="Toggle Tamil and English">
            <Languages size={18} />
          </button>
          <a className="whatsapp-chip" href={whatsappFor()} target="_blank" rel="noreferrer">
            <MessageCircle size={17} /> WhatsApp
          </a>
          <button className="icon-button mobile-menu-button" type="button" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <Menu size={20} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.aside className="mobile-menu" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}>
            <button className="icon-button" type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu">
              <X />
            </button>
            {['Birds', 'Breeds', 'Gallery', 'FAQ', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>
            ))}
          </motion.aside>
        )}
      </AnimatePresence>

      <main>
        <section id="home" className="hero-section">
          <motion.div className="hero-media" style={{ y: heroY, scale: heroScale }}>
            <img src={images.hero} alt="Premium rooster from GRF Growths farm" />
          </motion.div>
          <div className="hero-overlay" />
          <div className="particles" aria-hidden="true">
            {Array.from({ length: 18 }).map((_, index) => <i key={index} style={{ '--i': index } as React.CSSProperties} />)}
          </div>
          <div className="hero-content">
            <motion.span className="eyebrow" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
              <MapPin size={15} /> {copy.eyebrow}
            </motion.span>
            <h1>
              {copy.heroTitle.split(' ').map((word, index) => (
                <motion.span key={`${word}-${index}`} initial={{ y: 76, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 + index * 0.06 }}>
                  {word}
                </motion.span>
              ))}
            </h1>
            <motion.p initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
              {copy.heroCopy}
            </motion.p>
            <motion.div className="hero-buttons" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
              <a className="primary-action" href={whatsappFor()} target="_blank" rel="noreferrer"><MessageCircle size={18} /> {copy.whatsapp}</a>
              <a className="secondary-action" href="#birds">{copy.explore} <ArrowRight size={17} /></a>
            </motion.div>
          </div>
          <a className="scroll-indicator" href="#intro" aria-label="Scroll to introduction">
            <span /> Scroll <ArrowDown size={15} />
          </a>
        </section>

        <section id="intro" className="intro-section">
          <motion.figure initial={{ opacity: 0, x: -70 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.35 }}>
            <img src={images.owner} alt="GRF Growths farm owner holding a rooster" loading="lazy" />
          </motion.figure>
          <motion.div className="section-copy" initial={{ opacity: 0, x: 70 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.35 }}>
            <span className="eyebrow">GRF Growths</span>
            <h2>{copy.introTitle}</h2>
            <p>{copy.introCopy}</p>
            <div className="intro-facts">
              <span><MapPin /> {address}</span>
              <span><Bird /> Aseel, Nattu Seval, Kili, Country White, Kadaknath, Giriraja</span>
              <span><MessageCircle /> Mobile-first enquiries through WhatsApp</span>
            </div>
          </motion.div>
        </section>

        <section id="birds" className="birds-section">
          <div className="section-heading">
            <span className="eyebrow">Current Birds</span>
            <h2>{copy.birds}</h2>
            <p>Reusable product data is ready for Supabase. Prices stay direct-contact until GRF Growths confirms live pricing.</p>
          </div>
          <div className="birds-grid">
            {birdCards.map((bird, index) => (
              <motion.article className="bird-card" key={bird.id} initial={{ opacity: 0, y: 48 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }}>
                <div className="bird-image">
                  <img src={bird.image} alt={`${bird.name} at GRF Growths`} loading={index < 2 ? 'eager' : 'lazy'} />
                  <span>{bird.availability}</span>
                </div>
                <div className="bird-content">
                  <small>{bird.id}</small>
                  <h3>{language === 'ta' ? bird.nameTa : bird.name}</h3>
                  <p>{bird.description}</p>
                  <dl>
                    <div><dt>Breed</dt><dd>{bird.breed}</dd></div>
                    <div><dt>Age</dt><dd>{bird.age}</dd></div>
                    <div><dt>Weight</dt><dd>{bird.weight}</dd></div>
                    <div><dt>Colour</dt><dd>{bird.color}</dd></div>
                  </dl>
                  <div className="bird-footer">
                  <strong>{bird.price}</strong>
                    <a href={whatsappFor(bird)} target="_blank" rel="noreferrer"><MessageCircle size={16} /> Enquire</a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="breeds" className="breed-showcase">
          <div className="section-heading compact">
            <span className="eyebrow">Breed Showcase</span>
            <h2>Swipe through the bloodlines.</h2>
          </div>
          <div className="breed-track" ref={breedTrack}>
            {breedCards.map((breed) => (
              <article className="breed-panel" key={breed.name}>
                <img src={breed.image} alt={`${breed.name} rooster breed`} loading="lazy" />
                <div>
                  <span>{breed.count || 'Contact'} birds</span>
                  <h3>{breed.name}</h3>
                  <p>{breed.description}</p>
                  <ul>{breed.traits.map((trait) => <li key={trait}>{trait}</li>)}</ul>
                  <a href="#birds">Explore <ArrowRight size={16} /></a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="story-section" ref={storyRef}>
          <div className="story-visual">
            <img src={images.coop} alt="Clean poultry farm environment" loading="lazy" />
          </div>
          <div className="story-list">
            {storySteps.map(([title, text], index) => (
              <article className="story-copy" key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="why-section">
          <div className="section-heading">
            <span className="eyebrow">Why Choose GRF Growths</span>
            <h2>Premium care without unnecessary noise.</h2>
          </div>
          <div className="why-grid">
            {whyChoose.map(([title, description, Icon]) => (
              <motion.article key={title as string} whileHover={reducedMotion ? undefined : { y: -8 }}>
                <Icon size={24} />
                <h3>{title as string}</h3>
                <p>{description as string}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="gallery" className="gallery-section">
          <div className="section-heading">
            <span className="eyebrow">Farm Gallery</span>
            <h2>Real images from the GRF Growths collection.</h2>
          </div>
          <div className="masonry-gallery">
            {galleryItems.map((src, index) => (
              <motion.button className="gallery-item" key={src} type="button" onClick={() => setLightbox(index)} initial={{ clipPath: 'inset(18% 0 18% 0)', opacity: 0 }} whileInView={{ clipPath: 'inset(0 0 0 0)', opacity: 1 }} viewport={{ once: true }}>
                <img src={src} alt={`GRF Growths farm and rooster gallery image ${index + 1}`} loading="lazy" />
              </motion.button>
            ))}
          </div>
        </section>

        <section className="process-section">
          <div className="section-heading compact">
            <span className="eyebrow">Farming Process</span>
            <h2>Selection to delivery support.</h2>
          </div>
          <div className="process-line"><div ref={progressRef} /></div>
          <div className="process-grid">
            {process.map((step, index) => (
              <article key={step}>
                <span>{index + 1}</span>
                <h3>{step}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className="testimonials-section">
          <div>
            <span className="eyebrow">Customer Testimonials</span>
            <h2>Reserved for verified customer words.</h2>
          </div>
          <div className="testimonial-card">
            <AnimatePresence mode="wait">
              <motion.p key={testimonialIndex} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }}>
                {ta.testimonials}
              </motion.p>
            </AnimatePresence>
            <span>Placeholder {testimonialIndex + 1} / 3</span>
          </div>
        </section>

        <section id="faq" className="faq-section">
          <div className="section-heading compact">
            <span className="eyebrow">FAQ</span>
            <h2>Before you book a bird.</h2>
          </div>
          <div className="faq-list">
            {faqItems.map(([question, answer], index) => (
              <article className={activeFaq === index ? 'open' : ''} key={question}>
                <button type="button" onClick={() => setActiveFaq(activeFaq === index ? -1 : index)}>
                  {question} <ArrowRight size={17} />
                </button>
                <p>{answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="contact-copy">
            <span className="eyebrow">Contact & Location</span>
            <h2>Find the right bird for your farm.</h2>
            <p>Send a Bird ID through WhatsApp for current price, latest images and availability.</p>
            <div className="contact-actions">
              <a className="primary-action" href={whatsappFor()} target="_blank" rel="noreferrer"><MessageCircle /> WhatsApp</a>
              <a className="secondary-action dark" href={phoneHref}><Phone /> Call Now</a>
            </div>
            <form className="public-enquiry-form" onSubmit={handlePublicEnquiry}>
              <input aria-label="Leave this field empty" tabIndex={-1} autoComplete="off" className="honeypot" value={enquiryForm.website} onChange={(event) => setEnquiryForm({ ...enquiryForm, website: event.target.value })} />
              <input required placeholder="Name" value={enquiryForm.name} onChange={(event) => setEnquiryForm({ ...enquiryForm, name: event.target.value })} />
              <input required placeholder="Phone" value={enquiryForm.phone} onChange={(event) => setEnquiryForm({ ...enquiryForm, phone: event.target.value })} />
              <input type="email" placeholder="Email optional" value={enquiryForm.email} onChange={(event) => setEnquiryForm({ ...enquiryForm, email: event.target.value })} />
              <textarea required rows={3} placeholder="Tell us what kind of bird you need" value={enquiryForm.message} onChange={(event) => setEnquiryForm({ ...enquiryForm, message: event.target.value })} />
              <button type="submit">Send Enquiry</button>
              {enquiryStatus && <p>{enquiryStatus}</p>}
            </form>
          </div>
          <div className="contact-card">
            <a href={phoneHref}><Phone /> {phoneDisplay}</a>
            <a href={whatsappFor()} target="_blank" rel="noreferrer"><MessageCircle /> WhatsApp quick enquiry</a>
            <a href={instagram} target="_blank" rel="noreferrer"><Camera /> @guru_rooster</a>
            <a href={`mailto:${email}`}><Sparkles /> {email}</a>
            <a href={maps} target="_blank" rel="noreferrer"><MapPin /> {address}</a>
            <span><Clock /> Monday-Sunday: 6:00 AM-8:00 PM</span>
          </div>
        </section>
      </main>

      <footer>
        <img src={images.logo} alt="GRF Growths" />
        <p>Premium quality roosters raised with natural care in Tamil Nadu.</p>
        <span>© 2026 GRF Growths. All Rights Reserved.</span>
      </footer>

      <a className="floating-whatsapp" href={whatsappFor()} target="_blank" rel="noreferrer" aria-label="Chat with GRF Growths on WhatsApp">
        <MessageCircle />
      </a>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button type="button" className="icon-button close-lightbox" onClick={() => setLightbox(null)} aria-label="Close lightbox"><X /></button>
            <button type="button" className="icon-button" onClick={() => setLightbox((lightbox - 1 + galleryItems.length) % galleryItems.length)} aria-label="Previous image"><ChevronLeft /></button>
            <img src={galleryItems[lightbox]} alt="Expanded GRF Growths gallery item" />
            <button type="button" className="icon-button" onClick={() => setLightbox((lightbox + 1) % galleryItems.length)} aria-label="Next image"><ChevronRight /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function HelmetScripts() {
  useEffect(() => {
    document.title = 'GRF Growths | Premium Roosters in Salem, Tamil Nadu'
    const description = 'GRF Growths is a premium rooster farming business serving Salem and Tamil Nadu with healthy farm-raised birds and WhatsApp enquiries.'
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)

    const localBusiness = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'GRF Growths',
      image: `https://grfgrowths.netlify.app${images.hero}`,
      telephone: phoneDisplay,
      email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'No.81, Mankanoor, Puthagaram',
        addressRegion: 'Tamil Nadu',
        postalCode: '635602',
        addressCountry: 'IN',
      },
      openingHours: 'Mo-Su 06:00-20:00',
      url: 'https://grfgrowths.netlify.app/',
      sameAs: [instagram],
    }
    const productData = birds.map((bird) => ({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: `${bird.id} ${bird.breed} rooster`,
      image: `https://grfgrowths.netlify.app${bird.image}`,
      description: bird.description,
      brand: { '@type': 'Brand', name: 'GRF Growths' },
      offers: { '@type': 'Offer', priceCurrency: 'INR', availability: 'https://schema.org/InStock', url: 'https://grfgrowths.netlify.app/#birds' },
    }))
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify([localBusiness, ...productData])
    document.head.appendChild(script)
    return () => script.remove()
  }, [])

  return null
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AdminAuthProvider>
        <BrowserRouter>
          <Suspense fallback={<main className="admin-auth-loading"><span /><p>Loading...</p></main>}>
            <Routes>
              <Route path="/" element={<PublicSite />} />
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route element={<ProtectedAdminRoute />}>
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboardPage />} />
                  <Route path="breeds" element={<BreedsPage />} />
                  <Route path="breeds/new" element={<BreedFormPage />} />
                  <Route path="breeds/:id/edit" element={<BreedFormPage />} />
                  <Route path="birds" element={<BirdsPage />} />
                  <Route path="birds/new" element={<BirdFormPage />} />
                  <Route path="birds/:id/edit" element={<BirdFormPage />} />
                  <Route path="gallery" element={<GalleryPage />} />
                  <Route path="enquiries" element={<EnquiriesPage />} />
                  <Route path="testimonials" element={<TestimonialsPage />} />
                  <Route path="faqs" element={<FaqsPage />} />
                  <Route path="settings" element={<SettingsPage />} />
                </Route>
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
        <Toaster richColors position="top-right" />
      </AdminAuthProvider>
    </QueryClientProvider>
  )
}

export default App

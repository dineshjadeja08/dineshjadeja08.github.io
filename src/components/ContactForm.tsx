import { useState, type FormEvent } from 'react'
import { siteConfig } from '../lib/config'

const projectTypes = ['Business website', 'Landing page', 'E-commerce website', 'Web application', 'Admin dashboard', 'Website redesign', 'Backend API', 'Other']
const budgets = ['Below ₹10,000', '₹10,000 - ₹25,000', '₹25,000 - ₹50,000', '₹50,000+', 'Not sure yet']

type FormState = {
  name: string
  email: string
  phone: string
  business: string
  projectType: string
  budget: string
  message: string
}

const initialState: FormState = {
  name: '',
  email: '',
  phone: '',
  business: '',
  projectType: '',
  budget: '',
  message: '',
}

function encodeForm(data: Record<string, string>) {
  return new URLSearchParams(data).toString()
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.projectType || !form.budget || form.message.trim().length < 10) {
      setError('Please fill all required fields and add a short message.')
      setStatus('error')
      return
    }

    setStatus('submitting')
    const payload = { 'form-name': 'portfolio-contact', ...form }

    try {
      if (siteConfig.formEndpoint) {
        const response = await fetch(siteConfig.formEndpoint, {
          method: 'POST',
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        if (!response.ok) throw new Error('Form service rejected the message.')
      } else {
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: encodeForm(payload),
        })
        if (!response.ok) throw new Error('Could not submit the form.')
      }
      setForm(initialState)
      setStatus('success')
    } catch {
      setError('Something went wrong. Please try WhatsApp or email.')
      setStatus('error')
    }
  }

  return (
    <>
      <form name="portfolio-contact" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
        <input name="name" />
        <input name="email" />
        <input name="phone" />
        <input name="business" />
        <input name="projectType" />
        <input name="budget" />
        <textarea name="message" />
      </form>

      <form className="contact-form" onSubmit={handleSubmit}>
        <input placeholder="Name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
        <input type="email" placeholder="Email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required />
        <input placeholder="Phone or WhatsApp" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} required />
        <input placeholder="Business name" value={form.business} onChange={(event) => setForm({ ...form, business: event.target.value })} />
        <select value={form.projectType} onChange={(event) => setForm({ ...form, projectType: event.target.value })} required aria-label="Project type">
          <option value="">Project type</option>
          {projectTypes.map((type) => <option key={type}>{type}</option>)}
        </select>
        <select value={form.budget} onChange={(event) => setForm({ ...form, budget: event.target.value })} required aria-label="Estimated budget">
          <option value="">Estimated budget</option>
          {budgets.map((budget) => <option key={budget}>{budget}</option>)}
        </select>
        <textarea placeholder="Tell me about your project" rows={5} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} required />
        <button type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending...' : 'Send Message'}
        </button>
        {status === 'success' && <p className="form-success">Thanks. I received your message and will reply personally.</p>}
        {status === 'error' && <p className="form-error">{error}</p>}
      </form>
    </>
  )
}

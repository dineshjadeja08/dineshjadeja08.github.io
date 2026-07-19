import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import {
  deleteFaq,
  deleteTestimonial,
  listFaqs,
  listSettings,
  listTestimonials,
  upsertFaq,
  upsertSetting,
  upsertTestimonial,
} from '../services/grfAdminData'

const testimonialSchema = z.object({
  customer_name: z.string().min(1),
  location: z.string().optional(),
  content: z.string().min(5),
  is_published: z.boolean().default(false),
  display_order: z.coerce.number().int().default(0),
})

const faqSchema = z.object({
  question: z.string().min(5),
  answer: z.string().min(5),
  is_published: z.boolean().default(true),
  display_order: z.coerce.number().int().default(0),
})

export function TestimonialsPage() {
  const queryClient = useQueryClient()
  const { data = [] } = useQuery({ queryKey: ['admin', 'testimonials'], queryFn: listTestimonials })
  const { register, handleSubmit, reset } = useForm<z.input<typeof testimonialSchema>, unknown, z.output<typeof testimonialSchema>>({ resolver: zodResolver(testimonialSchema), defaultValues: { is_published: false, display_order: 0 } })
  const save = useMutation({
    mutationFn: upsertTestimonial,
    onSuccess: async () => {
      reset()
      toast.success('Testimonial saved.')
      await queryClient.invalidateQueries({ queryKey: ['admin', 'testimonials'] })
    },
  })
  const remove = useMutation({ mutationFn: deleteTestimonial, onSuccess: async () => queryClient.invalidateQueries({ queryKey: ['admin', 'testimonials'] }) })

  return (
    <main className="admin-page">
      <div className="admin-page-heading"><span>Testimonials</span><h1>Verified testimonials</h1><p>Do not publish fabricated feedback.</p></div>
      <form className="admin-form-grid" onSubmit={handleSubmit((values) => save.mutate(values))}>
        <label>Customer name<input {...register('customer_name')} /></label>
        <label>Location<input {...register('location')} /></label>
        <label className="admin-wide">Content<textarea rows={4} {...register('content')} /></label>
        <label>Display order<input type="number" {...register('display_order')} /></label>
        <label className="admin-check"><input type="checkbox" {...register('is_published')} /> Published</label>
        <button className="admin-primary-button admin-wide" type="submit">Save Testimonial</button>
      </form>
      <AdminSimpleList rows={data.map((item) => ({ id: item.id, title: item.customer_name || 'Unnamed', subtitle: item.content || '', published: item.is_published }))} onDelete={(id) => remove.mutate(id)} />
    </main>
  )
}

export function FaqsPage() {
  const queryClient = useQueryClient()
  const { data = [] } = useQuery({ queryKey: ['admin', 'faqs'], queryFn: listFaqs })
  const { register, handleSubmit, reset } = useForm<z.input<typeof faqSchema>, unknown, z.output<typeof faqSchema>>({ resolver: zodResolver(faqSchema), defaultValues: { is_published: true, display_order: 0 } })
  const save = useMutation({
    mutationFn: upsertFaq,
    onSuccess: async () => {
      reset()
      toast.success('FAQ saved.')
      await queryClient.invalidateQueries({ queryKey: ['admin', 'faqs'] })
    },
  })
  const remove = useMutation({ mutationFn: deleteFaq, onSuccess: async () => queryClient.invalidateQueries({ queryKey: ['admin', 'faqs'] }) })

  return (
    <main className="admin-page">
      <div className="admin-page-heading"><span>FAQs</span><h1>Questions</h1><p>Keep answers practical and accurate.</p></div>
      <form className="admin-form-grid" onSubmit={handleSubmit((values) => save.mutate(values))}>
        <label className="admin-wide">Question<input {...register('question')} /></label>
        <label className="admin-wide">Answer<textarea rows={4} {...register('answer')} /></label>
        <label>Display order<input type="number" {...register('display_order')} /></label>
        <label className="admin-check"><input type="checkbox" {...register('is_published')} /> Published</label>
        <button className="admin-primary-button admin-wide" type="submit">Save FAQ</button>
      </form>
      <AdminSimpleList rows={data.map((item) => ({ id: item.id, title: item.question || 'Question', subtitle: item.answer || '', published: item.is_published }))} onDelete={(id) => remove.mutate(id)} />
    </main>
  )
}

export function SettingsPage() {
  const queryClient = useQueryClient()
  const { data = [] } = useQuery({ queryKey: ['admin', 'settings'], queryFn: listSettings })
  const { register, handleSubmit } = useForm<{ setting_key: string; setting_value: string }>()
  const save = useMutation({
    mutationFn: (values: { setting_key: string; setting_value: string }) => upsertSetting({ setting_key: values.setting_key, setting_value: JSON.parse(values.setting_value) }),
    onSuccess: async () => {
      toast.success('Setting saved.')
      await queryClient.invalidateQueries({ queryKey: ['admin', 'settings'] })
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : 'Invalid JSON.'),
  })

  return (
    <main className="admin-page">
      <div className="admin-page-heading"><span>Settings</span><h1>Site settings</h1><p>Admins only. Values are stored as JSON.</p></div>
      <form className="admin-form-grid" onSubmit={handleSubmit((values) => save.mutate(values))}>
        <label>Key<input {...register('setting_key', { required: true })} /></label>
        <label className="admin-wide">JSON value<textarea rows={6} defaultValue="{}" {...register('setting_value', { required: true })} /></label>
        <button className="admin-primary-button admin-wide" type="submit">Save Setting</button>
      </form>
      <AdminSimpleList rows={data.map((item) => ({ id: item.id, title: item.setting_key, subtitle: JSON.stringify(item.setting_value), published: true }))} />
    </main>
  )
}

function AdminSimpleList({ rows, onDelete }: { rows: Array<{ id: string; title: string; subtitle: string; published: boolean }>; onDelete?: (id: string) => void }) {
  return (
    <section className="admin-panel admin-simple-list">
      {rows.length === 0 && <p>No records yet.</p>}
      {rows.map((row) => (
        <article key={row.id}>
          <div><strong>{row.title}</strong><p>{row.subtitle}</p><span>{row.published ? 'Published' : 'Draft'}</span></div>
          {onDelete && <button type="button" onClick={() => onDelete(row.id)}><Trash2 size={15} /> Delete</button>}
        </article>
      ))}
    </section>
  )
}

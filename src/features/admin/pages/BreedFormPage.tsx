import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Save } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'
import { getBreed, upsertBreed } from '../services/grfAdminData'
import { replaceImageSafely } from '../services/imageService'

const breedSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/, 'Use lowercase letters, numbers and hyphens.'),
  tamil_name: z.string().optional(),
  short_description: z.string().max(240).optional(),
  full_description: z.string().max(3000).optional(),
  starting_price: z.coerce.number().nonnegative().optional().or(z.literal('')),
  display_order: z.coerce.number().int().default(0),
  is_featured: z.boolean().default(false),
  is_published: z.boolean().default(false),
})

type BreedInput = z.input<typeof breedSchema>
type BreedValues = z.output<typeof breedSchema>

export function BreedFormPage() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const { data: breed } = useQuery({ queryKey: ['admin', 'breeds', id], queryFn: () => getBreed(id!), enabled: isEdit })
  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm<BreedInput, unknown, BreedValues>({
    resolver: zodResolver(breedSchema),
    defaultValues: { display_order: 0, is_featured: false, is_published: false },
  })

  useEffect(() => {
    if (breed) {
      reset({
        name: breed.name,
        slug: breed.slug,
        tamil_name: breed.tamil_name || '',
        short_description: breed.short_description || '',
        full_description: breed.full_description || '',
        starting_price: breed.starting_price ?? '',
        display_order: breed.display_order,
        is_featured: breed.is_featured,
        is_published: breed.is_published,
      })
    }
  }, [breed, reset])

  useEffect(() => {
    const beforeUnload = (event: BeforeUnloadEvent) => {
      if (!isDirty) return
      event.preventDefault()
    }
    window.addEventListener('beforeunload', beforeUnload)
    return () => window.removeEventListener('beforeunload', beforeUnload)
  }, [isDirty])

  const mutation = useMutation({
    mutationFn: async (values: BreedValues) => {
      const saved = await upsertBreed({
        id,
        name: values.name,
        slug: values.slug,
        tamil_name: values.tamil_name || null,
        short_description: values.short_description || null,
        full_description: values.full_description || null,
      starting_price: values.starting_price === '' ? null : Number(values.starting_price),
        display_order: values.display_order,
        is_featured: values.is_featured,
        is_published: values.is_published,
        cover_image_path: breed?.cover_image_path ?? null,
      })

      if (coverFile) {
        await replaceImageSafely({
          file: coverFile,
          folder: { kind: 'breed', slug: values.slug },
          oldPath: breed?.cover_image_path,
          updateRecord: async (cover_image_path) => {
            await upsertBreed({ ...saved, cover_image_path })
          },
        })
      }

      return saved
    },
    onSuccess: async () => {
      toast.success('Breed saved.')
      await queryClient.invalidateQueries({ queryKey: ['admin', 'breeds'] })
      navigate('/admin/breeds')
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : 'Could not save breed.'),
  })

  return (
    <main className="admin-page">
      <div className="admin-page-heading">
        <span>{isEdit ? 'Edit Breed' : 'New Breed'}</span>
        <h1>{isEdit ? 'Edit breed' : 'Create breed'}</h1>
        <p>Use verified GRF content. Leave prices blank when not confirmed.</p>
      </div>

      <form className="admin-form-grid" onSubmit={handleSubmit((values) => mutation.mutate(values))}>
        <label>Name<input {...register('name')} />{errors.name && <small>{errors.name.message}</small>}</label>
        <label>Slug<input {...register('slug')} />{errors.slug && <small>{errors.slug.message}</small>}</label>
        <label>Tamil name<input {...register('tamil_name')} /></label>
        <label>Starting price<input type="number" {...register('starting_price')} /></label>
        <label className="admin-wide">Short description<textarea rows={3} {...register('short_description')} /></label>
        <label className="admin-wide">Full description<textarea rows={6} {...register('full_description')} /></label>
        <label>Display order<input type="number" {...register('display_order')} /></label>
        <label>Cover image<input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => setCoverFile(event.target.files?.[0] ?? null)} /></label>
        <label className="admin-check"><input type="checkbox" {...register('is_featured')} /> Featured</label>
        <label className="admin-check"><input type="checkbox" {...register('is_published')} /> Published</label>
        <button className="admin-primary-button admin-wide" type="submit" disabled={mutation.isPending}><Save size={16} /> Save Breed</button>
      </form>
    </main>
  )
}

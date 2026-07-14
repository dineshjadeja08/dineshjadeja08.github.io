import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Save, Upload } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'
import { getBird, listBirds, listBreeds, addBirdImage, upsertBird } from '../services/grfAdminData'
import { getPublicImageUrl, uploadCompressedImage } from '../services/imageService'

const birdSchema = z.object({
  bird_code: z.string().min(3),
  title: z.string().min(2),
  breed_id: z.string().optional(),
  age_months: z.coerce.number().int().positive().optional().or(z.literal('')),
  weight_kg: z.coerce.number().positive().optional().or(z.literal('')),
  colour: z.string().optional(),
  gender: z.string().optional(),
  price: z.coerce.number().nonnegative().optional().or(z.literal('')),
  discount_price: z.coerce.number().nonnegative().optional().or(z.literal('')),
  description: z.string().max(3000).optional(),
  status: z.enum(['available', 'reserved', 'sold', 'hidden']),
  is_featured: z.boolean().default(false),
  is_published: z.boolean().default(false),
})

type BirdInput = z.input<typeof birdSchema>
type BirdValues = z.output<typeof birdSchema>

export function BirdFormPage() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [files, setFiles] = useState<File[]>([])
  const [uploadStatus, setUploadStatus] = useState('')
  const { data: breeds = [] } = useQuery({ queryKey: ['admin', 'breeds'], queryFn: listBreeds })
  const { data: allBirds = [] } = useQuery({ queryKey: ['admin', 'birds'], queryFn: listBirds })
  const { data: bird } = useQuery({ queryKey: ['admin', 'birds', id], queryFn: () => getBird(id!), enabled: isEdit })
  const suggestedCode = useMemo(() => {
    const next = Math.max(...allBirds.map((item) => Number(item.bird_code.replace(/\D/g, '')) || 100), 100) + 1
    return `GRF-${next}`
  }, [allBirds])
  const { register, handleSubmit, reset, formState: { errors } } = useForm<BirdInput, unknown, BirdValues>({
    resolver: zodResolver(birdSchema),
    defaultValues: { bird_code: suggestedCode, status: 'available', is_featured: false, is_published: true },
  })

  useEffect(() => {
    if (bird) {
      reset({
        bird_code: bird.bird_code,
        title: bird.title,
        breed_id: bird.breed_id || '',
        age_months: bird.age_months ?? '',
        weight_kg: bird.weight_kg ?? '',
        colour: bird.colour || '',
        gender: bird.gender || '',
        price: bird.price ?? '',
        discount_price: bird.discount_price ?? '',
        description: bird.description || '',
        status: bird.status,
        is_featured: bird.is_featured,
        is_published: bird.is_published,
      })
    } else {
      reset((current) => ({ ...current, bird_code: suggestedCode }))
    }
  }, [bird, reset, suggestedCode])

  const mutation = useMutation({
    mutationFn: async (values: BirdValues) => {
      const saved = await upsertBird({
        id,
        bird_code: values.bird_code,
        title: values.title,
        breed_id: values.breed_id || null,
        age_months: values.age_months === '' ? null : Number(values.age_months),
        weight_kg: values.weight_kg === '' ? null : Number(values.weight_kg),
        colour: values.colour || null,
        gender: values.gender || null,
        price: values.price === '' ? null : Number(values.price),
        discount_price: values.discount_price === '' ? null : Number(values.discount_price),
        description: values.description || null,
        status: values.status,
        is_featured: values.is_featured,
        is_published: values.is_published,
      })

      for (const [index, file] of files.entries()) {
        const storagePath = await uploadCompressedImage(file, { kind: 'bird', birdCode: values.bird_code }, setUploadStatus)
        await addBirdImage({
          bird_id: saved.id,
          storage_path: storagePath,
          alt_text: `${values.bird_code} ${values.title}`,
          is_primary: !bird?.bird_images?.length && index === 0,
          display_order: (bird?.bird_images?.length || 0) + index,
        })
      }

      return saved
    },
    onSuccess: async () => {
      toast.success('Bird saved.')
      await queryClient.invalidateQueries({ queryKey: ['admin', 'birds'] })
      navigate('/admin/birds')
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : 'Could not save bird.'),
  })

  return (
    <main className="admin-page">
      <div className="admin-page-heading">
        <span>{isEdit ? 'Edit Bird' : 'New Bird'}</span>
        <h1>{isEdit ? 'Edit bird' : 'Create bird'}</h1>
        <p>Bird codes are never reused. New drafts suggest the next available GRF code.</p>
      </div>
      <form className="admin-form-grid" onSubmit={handleSubmit((values) => mutation.mutate(values))}>
        <label>Bird code<input {...register('bird_code')} />{errors.bird_code && <small>{errors.bird_code.message}</small>}</label>
        <label>Title<input {...register('title')} />{errors.title && <small>{errors.title.message}</small>}</label>
        <label>Breed<select {...register('breed_id')}><option value="">Unassigned</option>{breeds.map((breed) => <option key={breed.id} value={breed.id}>{breed.name}</option>)}</select></label>
        <label>Status<select {...register('status')}><option value="available">Available</option><option value="reserved">Reserved</option><option value="sold">Sold</option><option value="hidden">Hidden</option></select></label>
        <label>Age months<input type="number" {...register('age_months')} /></label>
        <label>Weight kg<input type="number" step="0.01" {...register('weight_kg')} /></label>
        <label>Colour<input {...register('colour')} /></label>
        <label>Gender<input {...register('gender')} /></label>
        <label>Price<input type="number" {...register('price')} /></label>
        <label>Discount price<input type="number" {...register('discount_price')} /></label>
        <label className="admin-wide">Description<textarea rows={5} {...register('description')} /></label>
        <label className="admin-check"><input type="checkbox" {...register('is_featured')} /> Featured</label>
        <label className="admin-check"><input type="checkbox" {...register('is_published')} /> Published</label>
        <label className="admin-wide">Photos<input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={(event) => setFiles(Array.from(event.target.files || []))} /></label>
        {uploadStatus && <p className="admin-wide">{uploadStatus}</p>}
        {bird?.bird_images?.length ? (
          <div className="admin-wide admin-image-strip">
            {bird.bird_images.map((image) => <img key={image.id} src={getPublicImageUrl(image.storage_path)} alt={image.alt_text || ''} />)}
          </div>
        ) : null}
        <button className="admin-primary-button admin-wide" type="submit" disabled={mutation.isPending}><Save size={16} /> Save Bird</button>
        <span className="admin-wide admin-muted"><Upload size={14} /> Images are compressed to WebP before upload.</span>
      </form>
    </main>
  )
}

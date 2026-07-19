import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import type { GalleryCategory } from '../../../types/grf'
import { deleteGalleryImage, listGalleryImages, upsertGalleryImage } from '../services/grfAdminData'
import { deleteImage, getPublicImageUrl, uploadCompressedImage } from '../services/imageService'

const categories: GalleryCategory[] = ['farm', 'birds', 'customers', 'delivery', 'general']

export function GalleryPage() {
  const queryClient = useQueryClient()
  const [category, setCategory] = useState<GalleryCategory>('farm')
  const [files, setFiles] = useState<File[]>([])
  const { data = [], isLoading } = useQuery({ queryKey: ['admin', 'gallery'], queryFn: listGalleryImages })
  const uploadMutation = useMutation({
    mutationFn: async () => {
      for (const [index, file] of files.entries()) {
        const storagePath = await uploadCompressedImage(file, { kind: 'gallery', category })
        await upsertGalleryImage({
          storage_path: storagePath,
          category,
          alt_text: `GRF Growths ${category} image`,
          is_published: true,
          display_order: data.length + index,
        })
      }
    },
    onSuccess: async () => {
      setFiles([])
      toast.success('Gallery images uploaded.')
      await queryClient.invalidateQueries({ queryKey: ['admin', 'gallery'] })
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : 'Upload failed.'),
  })
  const deleteMutation = useMutation({
    mutationFn: async (input: { id: string; storagePath: string }) => {
      await deleteGalleryImage(input.id)
      await deleteImage(input.storagePath).catch(() => undefined)
    },
    onSuccess: async () => {
      toast.success('Gallery image deleted.')
      await queryClient.invalidateQueries({ queryKey: ['admin', 'gallery'] })
    },
  })

  return (
    <main className="admin-page">
      <div className="admin-page-heading">
        <span>Gallery Manager</span>
        <h1>Gallery</h1>
        <p>Upload compressed WebP images, categorize them, and control publishing.</p>
      </div>
      <section className="admin-panel admin-upload-panel">
        <select value={category} onChange={(event) => setCategory(event.target.value as GalleryCategory)}>
          {categories.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
        <input type="file" multiple accept="image/jpeg,image/png,image/webp" onChange={(event) => setFiles(Array.from(event.target.files || []))} />
        <button className="admin-primary-button" type="button" disabled={files.length === 0 || uploadMutation.isPending} onClick={() => uploadMutation.mutate()}>
          Upload {files.length || ''} image{files.length === 1 ? '' : 's'}
        </button>
      </section>
      <section className="admin-gallery-grid">
        {isLoading && <p>Loading gallery...</p>}
        {data.map((image) => (
          <article key={image.id}>
            <img src={getPublicImageUrl(image.storage_path)} alt={image.alt_text || image.title || ''} />
            <div>
              <strong>{image.category}</strong>
              <span>{image.is_published ? 'Published' : 'Draft'}</span>
              <button type="button" onClick={() => deleteMutation.mutate({ id: image.id, storagePath: image.storage_path })}><Trash2 size={15} /> Delete</button>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}

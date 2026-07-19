import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Edit, Plus, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { deleteBreed, listBreeds } from '../services/grfAdminData'
import { getPublicImageUrl } from '../services/imageService'

export function BreedsPage() {
  const queryClient = useQueryClient()
  const { data = [], isLoading, error } = useQuery({ queryKey: ['admin', 'breeds'], queryFn: listBreeds })
  const deleteMutation = useMutation({
    mutationFn: deleteBreed,
    onSuccess: async () => {
      toast.success('Breed deleted.')
      await queryClient.invalidateQueries({ queryKey: ['admin', 'breeds'] })
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : 'Could not delete breed.'),
  })

  return (
    <main className="admin-page">
      <div className="admin-list-heading">
        <div className="admin-page-heading">
          <span>Breed Manager</span>
          <h1>Breeds</h1>
          <p>Manage English and Tamil breed content, cover photos, publishing and feature states.</p>
        </div>
        <Link className="admin-primary-button" to="/admin/breeds/new"><Plus size={16} /> New Breed</Link>
      </div>

      <section className="admin-panel">
        {isLoading && <p>Loading breeds...</p>}
        {error && <p>Unable to load breeds.</p>}
        {!isLoading && data.length === 0 && <p>No breeds yet.</p>}
        {data.length > 0 && (
          <div className="admin-table-wrap">
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>Cover</th>
                  <th>Name</th>
                  <th>Slug</th>
                  <th>Featured</th>
                  <th>Published</th>
                  <th>Order</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((breed) => (
                  <tr key={breed.id}>
                    <td>{breed.cover_image_path ? <img src={getPublicImageUrl(breed.cover_image_path)} alt="" className="admin-thumb" /> : <span className="admin-empty-thumb" />}</td>
                    <td><strong>{breed.name}</strong><small>{breed.tamil_name}</small></td>
                    <td>{breed.slug}</td>
                    <td>{breed.is_featured ? 'Yes' : 'No'}</td>
                    <td>{breed.is_published ? 'Published' : 'Draft'}</td>
                    <td>{breed.display_order}</td>
                    <td>
                      <div className="admin-row-actions">
                        <Link to={`/admin/breeds/${breed.id}/edit`} aria-label={`Edit ${breed.name}`}><Edit size={16} /></Link>
                        <button type="button" aria-label={`Delete ${breed.name}`} onClick={() => {
                          if (confirm(`Delete ${breed.name}?`)) deleteMutation.mutate(breed.id)
                        }}><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  )
}

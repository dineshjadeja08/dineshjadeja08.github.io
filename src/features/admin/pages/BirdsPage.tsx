import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Copy, Edit, Plus, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { deleteBird, listBirds, upsertBird } from '../services/grfAdminData'
import { getPublicImageUrl } from '../services/imageService'

export function BirdsPage() {
  const queryClient = useQueryClient()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')
  const { data = [], isLoading } = useQuery({ queryKey: ['admin', 'birds'], queryFn: listBirds })
  const deleteMutation = useMutation({
    mutationFn: deleteBird,
    onSuccess: async () => {
      toast.success('Bird deleted.')
      await queryClient.invalidateQueries({ queryKey: ['admin', 'birds'] })
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : 'Could not delete bird.'),
  })
  const duplicateMutation = useMutation({
    mutationFn: async (birdId: string) => {
      const source = data.find((bird) => bird.id === birdId)
      if (!source) throw new Error('Bird not found.')
      const nextNumber = Math.max(...data.map((bird) => Number(bird.bird_code.replace(/\D/g, '')) || 100), 100) + 1
      return upsertBird({
        bird_code: `GRF-${nextNumber}`,
        title: `${source.title} copy`,
        breed_id: source.breed_id,
        age_months: source.age_months,
        weight_kg: source.weight_kg,
        colour: source.colour,
        gender: source.gender,
        price: source.price,
        discount_price: source.discount_price,
        description: source.description,
        status: 'hidden',
        is_featured: false,
        is_published: false,
      })
    },
    onSuccess: async () => {
      toast.success('Bird duplicated as hidden draft.')
      await queryClient.invalidateQueries({ queryKey: ['admin', 'birds'] })
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : 'Could not duplicate bird.'),
  })

  const filtered = useMemo(() => data.filter((bird) => {
    const matchesText = `${bird.bird_code} ${bird.title}`.toLowerCase().includes(query.toLowerCase())
    const matchesStatus = status === 'all' || bird.status === status
    return matchesText && matchesStatus
  }), [data, query, status])

  return (
    <main className="admin-page">
      <div className="admin-list-heading">
        <div className="admin-page-heading">
          <span>Bird Manager</span>
          <h1>Birds</h1>
          <p>Manage individual bird codes, photos, pricing, availability and publishing.</p>
        </div>
        <Link className="admin-primary-button" to="/admin/birds/new"><Plus size={16} /> New Bird</Link>
      </div>

      <section className="admin-toolbar">
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by code or title" />
        <select value={status} onChange={(event) => setStatus(event.target.value)}>
          <option value="all">All statuses</option>
          <option value="available">Available</option>
          <option value="reserved">Reserved</option>
          <option value="sold">Sold</option>
          <option value="hidden">Hidden</option>
        </select>
      </section>

      <section className="admin-panel">
        {isLoading && <p>Loading birds...</p>}
        {!isLoading && filtered.length === 0 && <p>No birds found.</p>}
        {filtered.length > 0 && (
          <div className="admin-table-wrap">
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Code</th>
                  <th>Title</th>
                  <th>Breed</th>
                  <th>Status</th>
                  <th>Price</th>
                  <th>Published</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((bird) => {
                  const primary = bird.bird_images?.find((image) => image.is_primary) || bird.bird_images?.[0]
                  return (
                    <tr key={bird.id}>
                      <td>{primary ? <img src={getPublicImageUrl(primary.storage_path)} alt="" className="admin-thumb" /> : <span className="admin-empty-thumb" />}</td>
                      <td><strong>{bird.bird_code}</strong></td>
                      <td>{bird.title}</td>
                      <td>{bird.breeds?.name || 'Unassigned'}</td>
                      <td><span className={`admin-status ${bird.status}`}>{bird.status}</span></td>
                      <td>{bird.price ? `₹${bird.price}` : 'Contact'}</td>
                      <td>{bird.is_published ? 'Yes' : 'No'}</td>
                      <td>
                        <div className="admin-row-actions">
                          <Link to={`/admin/birds/${bird.id}/edit`}><Edit size={16} /></Link>
                          <button type="button" onClick={() => duplicateMutation.mutate(bird.id)}><Copy size={16} /></button>
                          <button type="button" onClick={() => {
                            if (confirm(`Delete ${bird.bird_code}? Associated DB image records will be removed by cascade.`)) deleteMutation.mutate(bird.id)
                          }}><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  )
}

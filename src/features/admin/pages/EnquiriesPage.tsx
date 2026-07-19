import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { MessageCircle } from 'lucide-react'
import { toast } from 'sonner'
import { createWhatsAppUrlForNumber } from '../../../lib/whatsapp'
import type { EnquiryStatus } from '../../../types/grf'
import { listEnquiries, updateEnquiry } from '../services/grfAdminData'

const statuses: EnquiryStatus[] = ['new', 'contacted', 'interested', 'completed', 'closed']

export function EnquiriesPage() {
  const queryClient = useQueryClient()
  const { data = [], isLoading } = useQuery({ queryKey: ['admin', 'enquiries'], queryFn: listEnquiries })
  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: EnquiryStatus }) => updateEnquiry(id, { status }),
    onSuccess: async () => {
      toast.success('Enquiry updated.')
      await queryClient.invalidateQueries({ queryKey: ['admin', 'enquiries'] })
    },
  })

  return (
    <main className="admin-page">
      <div className="admin-page-heading">
        <span>Enquiry Manager</span>
        <h1>Enquiries</h1>
        <p>Public visitors can insert enquiries, but only admins can read and manage them.</p>
      </div>
      <section className="admin-panel">
        {isLoading && <p>Loading enquiries...</p>}
        {!isLoading && data.length === 0 && <p>No enquiries yet.</p>}
        {data.length > 0 && (
          <div className="admin-table-wrap">
            <table className="admin-data-table">
              <thead><tr><th>Name</th><th>Phone</th><th>Message</th><th>Status</th><th>WhatsApp</th></tr></thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.customer_name || 'Unknown'}</td>
                    <td>{item.phone || '-'}</td>
                    <td>{item.message || '-'}</td>
                    <td><select value={item.status} onChange={(event) => mutation.mutate({ id: item.id, status: event.target.value as EnquiryStatus })}>{statuses.map((status) => <option key={status} value={status}>{status}</option>)}</select></td>
                    <td>{item.phone ? <a href={createWhatsAppUrlForNumber(item.phone, `Hello, this is GRF Growths regarding your enquiry.`)} target="_blank" rel="noreferrer"><MessageCircle size={16} /> Open</a> : '-'}</td>
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

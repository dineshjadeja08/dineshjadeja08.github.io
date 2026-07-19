import { Bird, Image, MessageCircle, ShieldCheck, Tags } from 'lucide-react'

const dashboardCards = [
  ['Total breeds', '0', Tags],
  ['Total birds', '0', Bird],
  ['Available birds', '0', ShieldCheck],
  ['Reserved birds', '0', MessageCircle],
  ['Published gallery', '0', Image],
]

export function AdminDashboardPage() {
  return (
    <main className="admin-page">
      <div className="admin-page-heading">
        <span>Dashboard</span>
        <h1>Farm content overview.</h1>
        <p>Live counts will connect to Supabase after the data service phase. The protected route and admin shell are active now.</p>
      </div>

      <section className="admin-card-grid">
        {dashboardCards.map(([label, value, Icon]) => (
          <article className="admin-stat-card" key={label as string}>
            <Icon size={22} />
            <span>{label as string}</span>
            <strong>{value as string}</strong>
          </article>
        ))}
      </section>

      <section className="admin-panel-grid">
        <article className="admin-panel">
          <h2>Recent enquiries</h2>
          <p>No enquiry data loaded yet.</p>
        </article>
        <article className="admin-panel">
          <h2>Content health</h2>
          <p>Birds with missing photos and missing prices will appear here after Supabase queries are connected.</p>
        </article>
      </section>
    </main>
  )
}

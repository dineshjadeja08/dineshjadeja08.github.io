export function AdminPlaceholderPage({ title, description }: { title: string; description: string }) {
  return (
    <main className="admin-page">
      <div className="admin-page-heading">
        <span>{title}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <section className="admin-panel">
        <h2>Phase placeholder</h2>
        <p>This route is protected and ready for the CRUD implementation phase.</p>
      </section>
    </main>
  )
}

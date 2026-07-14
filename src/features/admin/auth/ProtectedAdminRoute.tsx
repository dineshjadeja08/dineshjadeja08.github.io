import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAdminAuth } from './AdminAuthContext'

export function ProtectedAdminRoute() {
  const { loading, isAllowed, session } = useAdminAuth()
  const location = useLocation()

  if (loading) {
    return (
      <main className="admin-auth-loading">
        <span />
        <p>Checking admin access...</p>
      </main>
    )
  }

  if (!session || !isAllowed) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />
  }

  return <Outlet />
}

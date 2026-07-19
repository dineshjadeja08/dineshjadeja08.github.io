import { zodResolver } from '@hookform/resolvers/zod'
import { ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'
import { supabase } from '../../../lib/supabase'
import { useAdminAuth } from './AdminAuthContext'

const loginSchema = z.object({
  email: z.string().email('Enter a valid admin email.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
})

type LoginValues = z.infer<typeof loginSchema>

export function AdminLoginPage() {
  const { signIn, isAllowed, loading } = useAdminAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [submitting, setSubmitting] = useState(false)
  const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname || '/admin'
  const { register, handleSubmit, formState: { errors } } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  })

  if (!loading && isAllowed) return <Navigate to={from} replace />

  async function onSubmit(values: LoginValues) {
    setSubmitting(true)
    try {
      await signIn(values.email, values.password)
      toast.success('Signed in to GRF admin.')
      navigate(from, { replace: true })
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to sign in.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="admin-login-page">
      <section className="admin-login-card">
        <div className="admin-login-mark">
          <ShieldCheck />
        </div>
        <span>GRF Growths Admin</span>
        <h1>Secure farm control.</h1>
        <p>Use the Supabase admin account created for GRF Growths. Public registration is disabled.</p>

        {!supabase && (
          <div className="admin-warning">
            Supabase is not configured. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="admin-login-form">
          <label>
            Email
            <input type="email" autoComplete="email" {...register('email')} />
            {errors.email && <small>{errors.email.message}</small>}
          </label>
          <label>
            Password
            <input type="password" autoComplete="current-password" {...register('password')} />
            {errors.password && <small>{errors.password.message}</small>}
          </label>
          <button type="submit" disabled={submitting || !supabase}>
            {submitting ? 'Checking access...' : 'Sign In'}
          </button>
        </form>
      </section>
    </main>
  )
}

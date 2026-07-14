import type { Session, User } from '@supabase/supabase-js'
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { supabase } from '../../../lib/supabase'
import type { AdminRole, Profile } from '../../../types/grf'

type AdminAuthState = {
  session: Session | null
  user: User | null
  profile: Profile | null
  role: AdminRole | null
  loading: boolean
  isAllowed: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const allowedRoles: AdminRole[] = ['admin', 'editor', 'viewer']

const AdminAuthContext = createContext<AdminAuthState | null>(null)

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(Boolean(supabase))

  const loadProfile = useCallback(async (userId: string | null) => {
    if (!supabase || !userId) {
      setProfile(null)
      return
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name, role, created_at, updated_at')
      .eq('id', userId)
      .maybeSingle()

    if (error || !data || !allowedRoles.includes(data.role as AdminRole)) {
      setProfile(null)
      return
    }

    setProfile(data as Profile)
  }, [])

  useEffect(() => {
    if (!supabase) {
      return
    }

    let mounted = true

    supabase.auth.getSession().then(async ({ data }) => {
      if (!mounted) return
      setSession(data.session)
      await loadProfile(data.session?.user.id ?? null)
      if (mounted) setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
      setLoading(true)
      setSession(nextSession)
      await loadProfile(nextSession?.user.id ?? null)
      if (mounted) setLoading(false)
    })

    return () => {
      mounted = false
      listener.subscription.unsubscribe()
    }
  }, [loadProfile])

  const signIn = useCallback(async (email: string, password: string) => {
    if (!supabase) throw new Error('Supabase is not configured.')

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    setSession(data.session)
    await loadProfile(data.user.id)
  }, [loadProfile])

  const signOut = useCallback(async () => {
    if (!supabase) return
    await supabase.auth.signOut()
    setSession(null)
    setProfile(null)
  }, [])

  const value = useMemo<AdminAuthState>(() => {
    const role = profile?.role ?? null
    return {
      session,
      user: session?.user ?? null,
      profile,
      role,
      loading,
      isAllowed: Boolean(session && role && allowedRoles.includes(role)),
      signIn,
      signOut,
    }
  }, [loading, profile, session, signIn, signOut])

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (!context) throw new Error('useAdminAuth must be used inside AdminAuthProvider')
  return context
}

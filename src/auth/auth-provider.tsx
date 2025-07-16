import { createClient, type Session } from '@supabase/supabase-js'
import { useEffect, useState, type ReactNode } from 'react'
import { AuthContext } from '@/auth'
import { userFetch } from '@/api/fetches/user-fetch'
import type { User } from '@/entities/user'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const processSession = async (session: Session | null) => {
      setLoading(true)
      if (session) {
        const profile = await userFetch.getUserById(session?.user.id)
        setUser({ ...session.user, ...profile })
      }
      if (!session) {
        setUser(null)
      }
      setLoading(false)
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      processSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      processSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>
}

import { useAuth } from './use-auth'
import { Navigate } from 'react-router'
import { paths } from '@/routers/paths'
import type { ReactNode } from 'react'

export function OnlyPrivateGuard({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <Navigate to={paths.login} />
  }
  return children
}

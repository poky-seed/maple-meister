import { Navigate } from 'react-router'
import { useAuth } from './use-auth'
import type { ReactNode } from 'react'
import { paths } from '@/routers/paths'

export function OnlyAdminGuard({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  if (user?.accessLevel.toUpperCase() !== 'ADMIN') {
    return <Navigate to={paths.root} />
  }
  return children
}

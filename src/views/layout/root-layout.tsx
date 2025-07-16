import { AuthProvider } from '@/auth'
import { Outlet } from 'react-router'

export function RootLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  )
}

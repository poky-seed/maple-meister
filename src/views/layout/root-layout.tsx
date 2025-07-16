import { AuthProvider } from '@/auth'
import { Toaster } from '@/components/ui/sonner'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Outlet } from 'react-router'

export function RootLayout() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Outlet />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  )
}

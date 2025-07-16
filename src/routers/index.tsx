import { LoginView, MainView } from '@/views'
import { AppLayout, RootLayout } from '@/views/layout'
import { OnlyAdminGuard, OnlyPublicGuard } from '@/auth'
import { paths } from './paths'
import { createBrowserRouter, Outlet } from 'react-router'
import { adminRoutes } from './admin-routes'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: paths.root,
        element: <AppLayout />,
        children: [
          {
            path: paths.root,
            element: <MainView />,
          },
          {
            path: paths.admin.root,
            element: (
              <OnlyAdminGuard>
                <Outlet />
              </OnlyAdminGuard>
            ),
            children: adminRoutes,
          },
        ],
      },
      {
        path: paths.login,
        element: (
          <OnlyPublicGuard>
            <LoginView />
          </OnlyPublicGuard>
        ),
      },
    ],
  },
])

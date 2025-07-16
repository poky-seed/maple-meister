import { LoginView, MainView } from '@/views'
import { AppLayout, RootLayout } from '@/views/layout'
import { createBrowserRouter } from 'react-router'
import { paths } from './paths'
import { OnlyAdminGuard, OnlyPublicGuard } from '@/auth'

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
            path: paths.admin,
            element: (
              <OnlyAdminGuard>
                <div>Admin</div>
              </OnlyAdminGuard>
            ),
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

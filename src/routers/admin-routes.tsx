import { paths } from './paths'
import { type RouteObject } from 'react-router'
import { ManageItemView, ManageRecipeView, ManageWorldView } from '@/views'

export const adminRoutes: RouteObject[] = [
  {
    path: paths.admin.items,
    element: <ManageItemView />,
  },
  {
    path: paths.admin.recipes,
    element: <ManageRecipeView />,
  },
  {
    path: paths.admin.world,
    element: <ManageWorldView />,
  },
]

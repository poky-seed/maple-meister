import type { SidebarItem } from '@/components/nav-group'
import { paths } from '@/routers/paths'
import { Box, Construction, Globe, ScrollText } from 'lucide-react'

export const PUBLIC_SIDEBAR_ITEMS: SidebarItem[] = [
  {
    title: '아이템',
    url: paths.items,
    icon: Box,
  },
  {
    title: '레시피',
    url: paths.recipes,
    icon: ScrollText,
  },
]

export const PRIVATE_SIDEBAR_ITEMS: SidebarItem[] = [
  {
    title: '개인 페이지 준비중',
    url: '#',
    icon: Construction,
  },
]

export const ADMIN_SIDEBAR_ITEMS: SidebarItem[] = [
  {
    title: '아이템 관리',
    url: paths.admin.items,
    icon: Box,
  },
  {
    title: '레시피 관리',
    url: paths.admin.recipes,
    icon: ScrollText,
  },
  {
    title: '월드 관리',
    url: paths.admin.world,
    icon: Globe,
  },
]

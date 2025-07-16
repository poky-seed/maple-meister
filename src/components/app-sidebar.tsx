import * as React from 'react'
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from 'lucide-react'

import { NavGroup } from '@/components/nav-group'
import { NavUser } from '@/components/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import { useAuth } from '@/auth'
import {
  ADMIN_SIDEBAR_ITEMS,
  PRIVATE_SIDEBAR_ITEMS,
  PUBLIC_SIDEBAR_ITEMS,
} from '@/settings/sidebar'
import { WorldSwitcher } from './world-switcher'
import { useGetWorlds } from '@/api/hooks/worlds'

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, loading } = useAuth()
  const { worlds, isLoading } = useGetWorlds()

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <WorldSwitcher worlds={worlds} isLoading={isLoading} />
      </SidebarHeader>
      <SidebarContent>
        <NavGroup title="PUBLIC" items={PUBLIC_SIDEBAR_ITEMS} />
        {!loading && user && <NavGroup title="PRIVATE" items={PRIVATE_SIDEBAR_ITEMS} />}
        {!loading && user && user.accessLevel.toUpperCase() === 'ADMIN' && (
          <NavGroup title="ADMIN" items={ADMIN_SIDEBAR_ITEMS} />
        )}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

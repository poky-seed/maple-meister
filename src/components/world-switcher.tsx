import * as React from 'react'
import { ChevronsUpDown, Globe, Loader2 } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import type { World } from '@/entities/worlds'

interface WorldSwitcherProps {
  worlds: World[]
  isLoading?: boolean
}

export function WorldSwitcher({ worlds, isLoading }: WorldSwitcherProps) {
  const { isMobile } = useSidebar()
  const [activeTeam, setActiveTeam] = React.useState(worlds[0])

  React.useEffect(() => {
    setActiveTeam(worlds[0])
  }, [worlds, isLoading])

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {isLoading || !activeTeam ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <>
                  <div className="bg-white border border-sidebar-border text-sidebar-accent-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    {activeTeam?.logo ? (
                      <img src={activeTeam.logo} alt={activeTeam.name} className="size-4" />
                    ) : (
                      <Globe />
                    )}
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{activeTeam.name}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto" />
                </>
              )}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              월드 선택
            </DropdownMenuLabel>
            {worlds.map((world, index) => (
              <DropdownMenuItem
                key={index}
                onClick={() => setActiveTeam(world)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-md border">
                  {world.logo ? (
                    <img src={world.logo} alt={world.name} className="size-4" />
                  ) : (
                    <Globe />
                  )}
                </div>
                {world.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

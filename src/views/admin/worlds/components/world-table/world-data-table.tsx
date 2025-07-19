import { useAllGetWorlds, useUpdateeWorldActivate } from '@/api/hooks/worlds'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { CircleCheck, CirclePause, Globe } from 'lucide-react'
import { UpdateWorldDialogTrigger } from '@/views/admin/worlds/components'
import type { ColumnDef } from '@tanstack/react-table'
import type { World } from '@/entities/worlds'
import { DataTable } from '@/components/data-table'
import { cn } from '@/lib/utils'

interface WorldDataTableProps {
  className?: string
}

export function WorldDataTable({ className }: WorldDataTableProps) {
  const { worlds, isLoading } = useAllGetWorlds()
  const { activateWorld, deactivateWorld } = useUpdateeWorldActivate()

  const columns: ColumnDef<World>[] = [
    {
      header: 'ID',
      accessorKey: 'id',
      size: 10,
    },
    {
      header: '',
      accessorKey: 'logo',
      size: 10,
      cell: ({ row }) => {
        const name = row.original.name
        const logo = row.original.logo
        return (
          <div className="flex justify-center items-center">
            {logo ? <img src={logo} alt={name} className="size-5" /> : <Globe />}
          </div>
        )
      },
    },
    {
      header: '월드명',
      accessorKey: 'name',
    },
    {
      accessorKey: 'isActive',
      header: () => <div className="w-full text-center">상태</div>,
      size: 30,
      cell: ({ row }) => {
        const isActive = row.original.isActive
        return (
          <div className="flex justify-center items-center">
            {isActive ? (
              <CircleCheck className="size-4 text-green-600" />
            ) : (
              <CirclePause className="size-4 text-red-500" />
            )}
          </div>
        )
      },
    },
    {
      id: 'actions',
      size: 40,
      cell: ({ row }) => {
        const world = row.original
        return (
          <div className="flex gap-2 shrink-0">
            <UpdateWorldDialogTrigger data={row.original} />
            {world.isActive ? (
              <Tooltip disableHoverableContent>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={() => deactivateWorld(world.id)}>
                    <CirclePause className="size-4 text-red-500" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>월드 비활성화</TooltipContent>
              </Tooltip>
            ) : (
              <Tooltip disableHoverableContent>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={() => activateWorld(world.id)}>
                    <CircleCheck className="size-4 text-green-600" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>월드 활성화</TooltipContent>
              </Tooltip>
            )}
          </div>
        )
      },
    },
  ]

  return <DataTable columns={columns} data={worlds} className={cn(className)} />
}

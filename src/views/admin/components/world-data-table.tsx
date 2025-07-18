import { useAllGetWorlds, useUpdateeWorldActivate } from '@/api/hooks/worlds'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { CircleCheck, CirclePause, Globe, Pencil } from 'lucide-react'

interface WorldDataTableProps {
  className?: string
}

export function WorldDataTable({ className }: WorldDataTableProps) {
  const { worlds, isLoading } = useAllGetWorlds()
  const { activateWorld, deactivateWorld } = useUpdateeWorldActivate()

  return (
    <div className={cn('overflow-hidden border rounded-lg', className)}>
      <div className="overflow-y-auto w-full h-full">
        <Table>
          <TableHeader className="h-14">
            <TableRow className="bg-muted">
              <TableHead className="w-16">ID</TableHead>
              <TableHead className="w-10"></TableHead>
              <TableHead>월드명</TableHead>
              <TableHead className="w-16 text-center">상태</TableHead>
              <TableHead className="w-0"></TableHead>
              <TableHead className="w-0"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {worlds.map((world) => (
              <TableRow key={world.id} className="h-12">
                <TableCell>{world.id}</TableCell>
                <TableCell>
                  <div className="flex justify-center items-center">
                    {world.logo ? (
                      <img src={world.logo} alt={world.name} className="size-5" />
                    ) : (
                      <Globe />
                    )}
                  </div>
                </TableCell>
                <TableCell>{world.name}</TableCell>
                <TableCell>
                  <div className="flex justify-center items-center">
                    {world.isActive ? (
                      <CircleCheck className="size-4 text-green-600" />
                    ) : (
                      <CirclePause className="size-4 text-red-500" />
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="icon">
                    <Pencil />
                  </Button>
                </TableCell>
                <TableCell>
                  {world.isActive ? (
                    <Button variant="outline" size="icon" onClick={() => deactivateWorld(world.id)}>
                      <CirclePause className="size-4 text-red-500" />
                    </Button>
                  ) : (
                    <Button variant="outline" size="icon" onClick={() => activateWorld(world.id)}>
                      <CircleCheck className="size-4 text-green-600" />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

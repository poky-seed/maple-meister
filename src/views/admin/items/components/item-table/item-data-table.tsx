import { useGetItems } from '@/api/hooks/items'
import type { ColumnDef } from '@tanstack/react-table'
import type { Item } from '@/entities/items'
import { Box } from 'lucide-react'
import { cn } from '@/lib/utils'
import { UpdateItemSheetTrigger } from '@/views/admin/items/components'
import { DataTable } from '@/components/data-table'

interface ItemDataTableProps {
  className?: string
}

export function ItemDataTable({ className }: ItemDataTableProps) {
  const { items, isLoading } = useGetItems()

  const columns: ColumnDef<Item>[] = [
    {
      header: 'ID',
      accessorKey: 'id',
      size: 10,
    },
    {
      header: '',
      accessorKey: 'imageUrl',
      size: 10,
      cell: ({ row }) => {
        const name = row.original.name
        const imageUrl = row.original.imageUrl
        return (
          <div className="flex justify-center items-center border rounded aspect-square max-w-14">
            {imageUrl ? <img src={imageUrl} alt={name} className="size-8" /> : <Box />}
          </div>
        )
      },
    },
    {
      header: '아이템명',
      accessorKey: 'name',
    },
    {
      id: 'actions',
      size: 10,
      cell: ({ row }) => {
        const item = row.original
        return (
          <div className="flex gap-2">
            <UpdateItemSheetTrigger data={item} />
          </div>
        )
      },
    },
  ]

  return <DataTable data={items} columns={columns} className={cn(className)} />
}

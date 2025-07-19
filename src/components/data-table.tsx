import { cn } from '@/lib/utils'
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'

interface DataTableOptions {
  headerClassName?: string
  rowClassName?: string
}

interface DataTableProps<TData, TValue> {
  className?: string
  data: TData[]
  columns: ColumnDef<TData, TValue>[]
  options?: DataTableOptions
}

export function DataTable<TData, TValue>({
  className,
  data,
  columns,
  options,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className={cn('overflow-hidden border rounded-lg', className)}>
      <div className="overflow-y-auto w-full h-full">
        <Table className="w-full table-fixed">
          <TableHeader className={cn('h-14', options?.headerClassName)}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-muted">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    style={{
                      ...(header.column.columnDef.size === undefined
                        ? { width: 'auto' }
                        : {
                            width: `${header.getSize()}px`,
                            minWidth: `${header.getSize()}px`,
                            maxWidth: `${header.getSize()}px`,
                            flexShrink: 0,
                          }),
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className={cn(options?.rowClassName)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{
                        ...(cell.column.columnDef.size === undefined
                          ? { width: 'auto' }
                          : {
                              width: `${cell.column.getSize()}px`,
                              minWidth: `${cell.column.getSize()}px`,
                              maxWidth: `${cell.column.getSize()}px`,
                              flexShrink: 0,
                            }),
                      }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

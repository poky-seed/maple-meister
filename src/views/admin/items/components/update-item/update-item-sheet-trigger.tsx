import { useBoolean } from '@/hooks/use-boolean'
import { UpdateItemSheet } from './update-item-sheet'
import type { Item } from '@/entities/items'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

interface UpdateItemSheetTriggerProps {
  data: Item
}

export function UpdateItemSheetTrigger({ data }: UpdateItemSheetTriggerProps) {
  const open = useBoolean()

  return (
    <Tooltip disableHoverableContent>
      <Dialog open={open.value} onOpenChange={open.setValue}>
        <DialogTrigger asChild>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon">
              <Pencil />
            </Button>
          </TooltipTrigger>
        </DialogTrigger>
        <UpdateItemSheet prev={data} onClose={open.onFalse} />
      </Dialog>
      <TooltipContent>아이템 수정</TooltipContent>
    </Tooltip>
  )
}

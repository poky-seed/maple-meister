import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { useBoolean } from '@/hooks/use-boolean'
import { UpdateWorldDialog } from './update-world-dialog'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import type { World } from '@/entities/worlds'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

interface UpdateWorldDialogTriggerProps {
  data: World
}

export function UpdateWorldDialogTrigger({ data }: UpdateWorldDialogTriggerProps) {
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
        <UpdateWorldDialog prev={data} onClose={open.onFalse} />
      </Dialog>
      <TooltipContent>월드 수정</TooltipContent>
    </Tooltip>
  )
}

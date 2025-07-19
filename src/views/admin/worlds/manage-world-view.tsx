import { Button } from '@/components/ui/button'
import { CreateWorldDialog, WorldDataTable } from './components'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

export function ManageWorldView() {
  return (
    <div className="flex flex-1 w-full flex-col gap-4 items-center overflow-hidden">
      <div className="w-full flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="px-5">월드 생성</Button>
          </DialogTrigger>
          <CreateWorldDialog className="shrink-0" />
        </Dialog>
      </div>
      <WorldDataTable className="w-full flex-1" />
    </div>
  )
}

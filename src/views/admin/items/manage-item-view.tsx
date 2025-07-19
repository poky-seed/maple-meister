import { Button } from '@/components/ui/button'
import { Sheet, SheetTrigger } from '@/components/ui/sheet'
import { CreateItemSheet } from './components'
import { ItemDataTable } from './components'

export function ManageItemView() {
  return (
    <div className="flex flex-1 w-full flex-col gap-4 items-center overflow-hidden">
      <div className="w-full flex justify-end">
        <Sheet>
          <SheetTrigger asChild>
            <Button>아이템 생성</Button>
          </SheetTrigger>
          <CreateItemSheet />
        </Sheet>
      </div>
      <ItemDataTable className="w-full flex-1" />
    </div>
  )
}

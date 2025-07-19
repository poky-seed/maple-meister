import { useCreateItem } from '@/api/hooks/items'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { useSingleImageUpload } from '@/hooks'
import { useState } from 'react'

export function CreateItemSheet() {
  const [name, setName] = useState('')

  const { createItem } = useCreateItem()
  const { file, setFile, Dropzone } = useSingleImageUpload({
    size: 86,
  })

  const createItemHandler = () => {
    if (!file || name.trim() === '') {
      return
    }
    createItem({
      name,
      image: file,
      type: 'ITEM',
    })
    setFile(null)
    setName('')
  }

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>아이템 생성</SheetTitle>
        <SheetDescription>아이템을 생성합니다.</SheetDescription>
      </SheetHeader>
      <div className="flex flex-col gap-6 p-4">
        <div className="flex justify-center">{Dropzone}</div>
        <div className="flex flex-col gap-2 w-full">
          <Label>아이템 이름</Label>
          <Input placeholder="아이템 이름" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Label>아이템 타입</Label>
          <Input placeholder="아이템 타입" disabled />
        </div>
      </div>
      <SheetFooter>
        <Button onClick={createItemHandler} disabled={!file || name.trim() === ''}>
          아이템 생성하기
        </Button>
      </SheetFooter>
    </SheetContent>
  )
}

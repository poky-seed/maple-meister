import { useUpdateItem } from '@/api/hooks/items'
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
import type { Item } from '@/entities/items'
import { useSingleImageUpload } from '@/hooks'
import { useState } from 'react'

interface UpdateItemSheetProps {
  prev: Item
  onClose?: () => void
}

export function UpdateItemSheet({ prev, onClose }: UpdateItemSheetProps) {
  const [name, setName] = useState(prev.name)

  const { updateItem } = useUpdateItem()
  const { file, setFile, Dropzone } = useSingleImageUpload({
    defaultSrc: prev.imageUrl,
    size: 86,
  })

  const updateItemHandler = () => {
    if (!file && name.trim() === '') {
      return
    }
    updateItem(
      prev.id,
      {
        name,
        image: file,
        type: prev.type,
      },
      {
        onSuccess: () => {
          setFile(null)
          setName('')
          onClose?.()
        },
      }
    )
  }

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>{prev.name} 아이템 수정</SheetTitle>
        <SheetDescription>아이템 정보를 수정합니다.</SheetDescription>
      </SheetHeader>
      <div className="flex flex-col gap-4 p-4">
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
        <Button onClick={updateItemHandler} disabled={!file && name.trim() === ''}>
          아이템 수정하기
        </Button>
      </SheetFooter>
    </SheetContent>
  )
}

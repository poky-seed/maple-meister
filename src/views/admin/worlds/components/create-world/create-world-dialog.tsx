import { useCreateWorld } from '@/api/hooks/worlds'
import { Button } from '@/components/ui/button'
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useSingleImageUpload } from '@/hooks'
import { cn } from '@/lib/utils'
import { Globe } from 'lucide-react'
import { useEffect, useState } from 'react'

interface CreateWorldDialogProps {
  className?: string
}

export function CreateWorldDialog({ className }: CreateWorldDialogProps) {
  const [name, setName] = useState('')

  const { createWorld } = useCreateWorld()
  const { file, setFile, Dropzone } = useSingleImageUpload({
    noImageIcon: <Globe />,
  })

  useEffect(() => {
    if (file) {
      setName(file.name.split('.')[0])
    }
  }, [file])

  const createWorldHandler = () => {
    if (!file || name.trim() === '') {
      return
    }
    createWorld(
      {
        name,
        logo: file,
      },
      {
        onSuccess: () => {
          setFile(null)
          setName('')
        },
      }
    )
  }

  return (
    <DialogContent className={cn('w-full max-w-md', className)}>
      <DialogHeader>
        <DialogTitle>월드 생성</DialogTitle>
      </DialogHeader>
      <div className="flex gap-2 items-center">
        {Dropzone}
        <Input
          placeholder="월드 이름"
          className="h-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <DialogFooter>
        <Button
          className="w-full"
          onClick={createWorldHandler}
          disabled={!file || name.trim() === ''}
        >
          월드 생성하기
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}

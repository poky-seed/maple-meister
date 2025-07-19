import { useUpdateWorld } from '@/api/hooks/worlds/use-update-world'
import { Button } from '@/components/ui/button'
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Globe } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { World } from '@/entities/worlds'
import { useSingleImageUpload } from '@/hooks'

interface UpdateWorldDialogProps {
  prev: World
  className?: string
  onClose?: () => void
}

export function UpdateWorldDialog({ className, prev, onClose }: UpdateWorldDialogProps) {
  const [name, setName] = useState(prev.name || '')

  const { updateWorld } = useUpdateWorld()
  const { file, setFile, Dropzone } = useSingleImageUpload({
    noImageIcon: <Globe />,
    defaultSrc: prev.logo,
  })

  useEffect(() => {
    if (file && name.trim() === '') {
      setName(file.name.split('.')[0])
    }
  }, [file, name])

  const updateWorldHandler = () => {
    if (!file && name.trim() === '') {
      return
    }
    updateWorld(
      prev.id,
      {
        name,
        logo: file,
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
    <DialogContent className={cn('w-full max-w-md', className)}>
      <DialogHeader>
        <DialogTitle>{prev.name} 월드 수정</DialogTitle>
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
          onClick={updateWorldHandler}
          disabled={!file && name.trim() === ''}
        >
          월드 수정하기
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}

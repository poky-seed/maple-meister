import { useUpdateWorld } from '@/api/hooks/worlds/use-update-world'
import { Button } from '@/components/ui/button'
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Dropzone, DropZoneArea, DropzoneTrigger, useDropzone } from '@/components/ui/dropzone'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Globe } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { World } from '@/entities/worlds'

interface UpdateWorldDialogProps {
  prev: World
  className?: string
  onClose?: () => void
}

export function UpdateWorldDialog({ className, prev, onClose }: UpdateWorldDialogProps) {
  const [file, setFile] = useState<File | null>(null)
  const [name, setName] = useState(prev.name || '')
  const [logoUrl, setLogoUrl] = useState<string | null>(prev.logo || null)

  const { updateWorld } = useUpdateWorld()

  const dropzone = useDropzone({
    onDropFile: async (file) => {
      return {
        status: 'success',
        result: file,
      }
    },
    validation: {
      accept: {
        'image/*': ['.png', '.jpg', '.jpeg', '.webp'],
      },
      maxSize: 10 * 1024 * 1024,
      maxFiles: 1,
    },
    shiftOnMaxFiles: true,
  })

  useEffect(() => {
    let objectUrl: string | null = null

    if (dropzone.fileStatuses.length > 0 && dropzone.fileStatuses[0].status === 'success') {
      setFile(dropzone.fileStatuses[0].result)
      if (name.trim() === '') {
        setName(dropzone.fileStatuses[0].result.name.split('.')[0])
      }
      objectUrl = URL.createObjectURL(dropzone.fileStatuses[0].result)
      setLogoUrl(objectUrl)
      return
    }
    setFile(null)

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl)
      }
    }
  }, [dropzone.fileStatuses])

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
        <Dropzone {...dropzone}>
          <DropZoneArea className="w-14 h-14 p-1 border-2 border-dashed border-gray-300 rounded-md shrink-0">
            <DropzoneTrigger className="w-full h-full flex items-center justify-center hover:bg-gray-200 p-2">
              {logoUrl ? (
                <img src={logoUrl} alt="World Logo" className="w-full h-full object-cover" />
              ) : (
                <Globe />
              )}
            </DropzoneTrigger>
          </DropZoneArea>
        </Dropzone>
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

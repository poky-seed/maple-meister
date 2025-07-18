import { useCreateWorld } from '@/api/hooks/worlds'
import { Button } from '@/components/ui/button'
import { DialogContent, DialogFooter, DialogHeader } from '@/components/ui/dialog'
import { Dropzone, DropZoneArea, DropzoneTrigger, useDropzone } from '@/components/ui/dropzone'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { DialogTitle } from '@radix-ui/react-dialog'
import { Globe } from 'lucide-react'
import { useEffect, useState } from 'react'

interface CreateWorldDialogProps {
  className?: string
}

export function CreateWorldDialog({ className }: CreateWorldDialogProps) {
  const [file, setFile] = useState<File | null>(null)
  const [name, setName] = useState('')
  const [logoUrl, setLogoUrl] = useState<string | null>(null)

  const { createWorld } = useCreateWorld()

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

    if (file) {
      objectUrl = URL.createObjectURL(file)
      setLogoUrl(objectUrl)
      return
    }
    setLogoUrl(null)

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl)
      }
    }
  }, [file])

  useEffect(() => {
    if (dropzone.fileStatuses.length > 0 && dropzone.fileStatuses[0].status === 'success') {
      setFile(dropzone.fileStatuses[0].result)
      setName(dropzone.fileStatuses[0].result.name.split('.')[0])
      return
    }
    setFile(null)
  }, [dropzone.fileStatuses])

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
          onClick={createWorldHandler}
          disabled={!file || name.trim() === ''}
        >
          월드 생성하기
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}

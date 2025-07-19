import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { DropZoneArea, Dropzone, DropzoneTrigger, useDropzone } from '@/components/ui/dropzone'
import { Image } from 'lucide-react'
import { useBoolean } from './use-boolean'

interface UseSingleImageUploadOptions {
  size?: number
  noImageIcon?: ReactNode
  defaultSrc?: string | null
}

export function useSingleImageUpload(options?: UseSingleImageUploadOptions) {
  const [file, setFile] = useState<File | null>(null)
  const [src, setSrc] = useState<string | null>(options?.defaultSrc ?? null)

  const afterDrop = useBoolean()

  const dropzone = useDropzone({
    onDropFile: async (file) => {
      afterDrop.onTrue()
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
    }
    if (afterDrop.value) {
      setSrc(objectUrl)
    }

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl)
      }
    }
  }, [file])

  useEffect(() => {
    if (dropzone.fileStatuses.length > 0 && dropzone.fileStatuses[0].status === 'success') {
      setFile(dropzone.fileStatuses[0].result)
      return
    }
    setFile(null)
  }, [dropzone.fileStatuses])

  const render = useMemo(() => {
    return (
      <Dropzone {...dropzone}>
        <DropZoneArea
          style={{ width: options?.size ?? 56, height: options?.size ?? 56 }}
          className={`p-1 border-2 border-dashed border-gray-300 rounded-md shrink-0`}
        >
          <DropzoneTrigger className="w-full h-full flex items-center justify-center hover:bg-gray-200 p-2">
            {src ? (
              <img src={src} alt="World Logo" className="w-full h-full object-cover" />
            ) : (
              options?.noImageIcon ?? <Image />
            )}
          </DropzoneTrigger>
        </DropZoneArea>
      </Dropzone>
    )
  }, [dropzone, options, src])

  return { file, src, Dropzone: render, setFile }
}

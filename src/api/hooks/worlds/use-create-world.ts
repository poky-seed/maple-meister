import { fetches } from '@/api/fetches'
import type { CreateWorldRequest } from '@/api/types/request'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export function useCreateWorld() {
  const queryClient = useQueryClient()

  const { mutate: createWorld } = useMutation({
    mutationFn: (request: CreateWorldRequest) => fetches.worlds.createWorld(request),
    onSuccess: ({ name }) => {
      toast.success(`${name} 월드가 생성되었습니다.`)
      queryClient.invalidateQueries({ queryKey: ['GET', 'WORLD'] })
    },
  })

  return { createWorld }
}

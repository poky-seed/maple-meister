import { fetches } from '@/api/fetches'
import type { CreateWorldRequest } from '@/api/types/request'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useCreateWorld() {
  const queryClient = useQueryClient()

  const { mutate: createWorld } = useMutation({
    mutationFn: (request: CreateWorldRequest) => fetches.worlds.createWorld(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GET', 'WORLD'] })
    },
  })

  return { createWorld }
}

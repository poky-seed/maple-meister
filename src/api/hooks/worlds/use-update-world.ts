import { fetches } from '@/api/fetches'
import type { UpdateWorldRequest } from '@/api/types/request'
import type { Database } from '@/entities/database'
import { useMutation, useQueryClient, type MutateOptions } from '@tanstack/react-query'
import { toast } from 'sonner'

interface UpdateWorldParams {
  worldId: number
  request: UpdateWorldRequest
}

export function useUpdateWorld() {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: (params: UpdateWorldParams) =>
      fetches.worlds.updateWorld(params.worldId, params.request),
    onSuccess: ({ name }) => {
      toast.success(`${name} 월드가 수정되었습니다.`)
      queryClient.invalidateQueries({ queryKey: ['GET', 'WORLD'] })
    },
  })

  const updateWorld = (
    worldId: number,
    request: UpdateWorldRequest,
    options?: MutateOptions<
      Database['public']['Tables']['worlds']['Row'],
      Error,
      UpdateWorldParams,
      unknown
    >
  ) => {
    mutate({ worldId, request }, options)
  }

  return { updateWorld }
}

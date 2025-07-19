import { fetches } from '@/api/fetches'
import type { UpdateItemRequest } from '@/api/types/request/item-request'
import type { Database } from '@/entities/database'
import { useMutation, useQueryClient, type MutateOptions } from '@tanstack/react-query'
import { toast } from 'sonner'

interface UpdateItemParams {
  id: number
  request: UpdateItemRequest
}

export function useUpdateItem() {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: (params: UpdateItemParams) =>
      fetches.items.updateItemById(params.id, params.request),
    onSuccess: ({ name }) => {
      toast.success(`${name} 아이템이 수정되었습니다.`)
      queryClient.invalidateQueries({ queryKey: ['GET', 'ITEM'] })
    },
  })

  const updateItem = (
    id: number,
    request: UpdateItemRequest,
    options?: MutateOptions<
      Database['public']['Tables']['items']['Row'],
      Error,
      UpdateItemParams,
      unknown
    >
  ) => {
    mutate({ id, request }, options)
  }

  return { updateItem }
}

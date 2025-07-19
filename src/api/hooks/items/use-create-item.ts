import { fetches } from '@/api/fetches'
import type { CreateItemRequest } from '@/api/types/request/item-request'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export function useCreateItem() {
  const queryClient = useQueryClient()

  const { mutate: createItem } = useMutation({
    mutationFn: (request: CreateItemRequest) => fetches.items.createItem(request),
    onSuccess: ({ name }) => {
      toast.success(`${name} 아이템이 생성되었습니다.`)
      queryClient.invalidateQueries({ queryKey: ['GET', 'ITEM'] })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return { createItem }
}

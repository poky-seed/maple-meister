import { fetches } from '@/api/fetches'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export function useUpdateeWorldActivate() {
  const queryClient = useQueryClient()

  const { mutate: activateWorld } = useMutation({
    mutationFn: (worldId: number) => fetches.worlds.activateWorldById(worldId),
    onSuccess: ({ name }) => {
      toast.success(`${name} 월드가 활성화되었습니다.`)
      queryClient.invalidateQueries({ queryKey: ['GET', 'WORLD'] })
    },
  })

  const { mutate: deactivateWorld } = useMutation({
    mutationFn: (worldId: number) => fetches.worlds.deactivateWorldById(worldId),
    onSuccess: ({ name }) => {
      toast.success(`${name} 월드가 비활성화되었습니다.`)
      queryClient.invalidateQueries({ queryKey: ['GET', 'WORLD'] })
    },
  })

  return { activateWorld, deactivateWorld }
}

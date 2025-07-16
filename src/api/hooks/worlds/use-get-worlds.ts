import { fetches } from '@/api/fetches'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useGetWorlds() {
  const { data, isLoading } = useQuery({
    queryKey: ['GET', 'WORLD'],
    queryFn: () => fetches.worlds.getWorlds(),
  })

  const worlds = useMemo(() => {
    if (!data) {
      return []
    }
    return data
  }, [data])

  return { worlds, isLoading }
}

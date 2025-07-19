import { fetches } from '@/api/fetches'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useAllGetWorlds() {
  const { data, isLoading } = useQuery({
    queryKey: ['GET', 'WORLD', 'ALL'],
    queryFn: () => fetches.worlds.getAllWorlds(),
  })

  const worlds = useMemo(() => {
    if (!data) {
      return []
    }
    return data.sort((a, b) => a.id - b.id)
  }, [data])

  return { worlds, isLoading }
}

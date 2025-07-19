import { fetches } from '@/api/fetches'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useGetItems() {
  const { data, isLoading } = useQuery({
    queryKey: ['GET', 'ITEM'],
    queryFn: () => fetches.items.getItems(),
  })

  const items = useMemo(() => {
    if (!data) {
      return []
    }
    return data.sort((a, b) => a.id - b.id)
  }, [data])

  return { items, isLoading }
}

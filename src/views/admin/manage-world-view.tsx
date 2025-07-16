import { useGetWorlds } from '@/api/hooks/worlds'
import { CreateWorldForm } from './components/create-world-form'

export function ManageWorldView() {
  const { worlds, isLoading } = useGetWorlds()

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <CreateWorldForm />
    </div>
  )
}

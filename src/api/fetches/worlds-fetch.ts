import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/entities/database'
import type { World } from '@/entities/worlds'

const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
)

export const worldsFetch = {
  getWorlds: async (): Promise<World[]> => {
    const { data, error } = await supabase.from('worlds').select('*').eq('is_active', true)
    if (error) {
      throw error
    }
    return data.map((world) => ({
      id: world.id,
      name: world.name,
    }))
  },
}

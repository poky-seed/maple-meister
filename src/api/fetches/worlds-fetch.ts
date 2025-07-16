import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/entities/database'

const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
)

export const worldsFetch = {
  getWorlds: async (): Promise<Database['public']['Tables']['worlds']['Row'][]> => {
    const { data, error } = await supabase.from('worlds').select('*')
    if (error) {
      throw error
    }
    return data
  },
}

import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/entities/database'

const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
)

export const itemsFetch = {
  getItems: async (): Promise<Database['public']['Tables']['items']['Row'][]> => {
    const { data, error } = await supabase.from('items').select('*')
    if (error) {
      throw error
    }
    return data
  },

  getItemById: async (id: number): Promise<Database['public']['Tables']['items']['Row']> => {
    const { data, error } = await supabase.from('items').select('*').eq('id', id).single()
    if (error) {
      throw error
    }
    return data
  },
}

import type { Database } from '@/entities/database'
import type { Profile } from '@/entities/user/profile'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export const userFetch = {
  getUserById: async (userId: string): Promise<Profile> => {
    const { data, error } = await supabase.from('users').select('*').eq('id', userId).single()

    if (error) {
      throw error
    }
    return {
      id: data.id,
      username: data.username ?? '',
      accessLevel: data.role as 'admin' | 'user',
    }
  },
}

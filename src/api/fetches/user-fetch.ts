import type { Profile } from '@/entities/user/profile'
import { supabase } from '@/lib/supabase'

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

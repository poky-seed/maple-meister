import type { Database } from '@/entities/database'
import { paths } from '@/routers/paths'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export const authFetch = {
  login: async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: paths.root,
      },
    })
    if (error) {
      throw error
    }
  },

  signOut: async () => {
    await supabase.auth.signOut()
  },

  getProfile: async () => {
    const { data, error } = await supabase.auth.getUser()
    if (error) {
      throw error
    }
    return data.user
  },
}

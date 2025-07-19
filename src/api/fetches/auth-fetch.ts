import { supabase } from '@/lib/supabase'
import { paths } from '@/routers/paths'

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

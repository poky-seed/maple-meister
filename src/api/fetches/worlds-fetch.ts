import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/entities/database'
import type { World } from '@/entities/worlds'
import type { CreateWorldRequest } from '@/api/types/request'
import { v4 as uuidv4 } from 'uuid'

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
      logo: world.logo,
    }))
  },

  createWorld: async (request: CreateWorldRequest) => {
    let logoUrl: string | null = null

    if (request.logo) {
      const file = request.logo
      const filePath = `world-logos/${Date.now()}-${uuidv4()}`

      const { error } = await supabase.storage.from('world-logos').upload(filePath, file)

      if (error) {
        throw error
      }
      logoUrl = supabase.storage.from('world-logos').getPublicUrl(filePath).data.publicUrl
    }

    const { data, error } = await supabase
      .from('worlds')
      .insert({
        name: request.name,
        logo: logoUrl,
      })
      .select()
      .single()

    if (error) {
      throw error
    }
    return data
  },
}

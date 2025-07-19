import type { World } from '@/entities/worlds'
import type { CreateWorldRequest, UpdateWorldRequest } from '@/api/types/request'
import { v4 as uuidv4 } from 'uuid'
import { supabase } from '@/lib/supabase'

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
      isActive: world.is_active,
    }))
  },

  getAllWorlds: async (): Promise<World[]> => {
    const { data, error } = await supabase.from('worlds').select('*')
    if (error) {
      throw error
    }
    return data.map((world) => ({
      id: world.id,
      name: world.name,
      logo: world.logo,
      isActive: world.is_active,
    }))
  },

  getWorldById: async (worldId: number): Promise<World> => {
    const { data, error } = await supabase.from('worlds').select('*').eq('id', worldId).single()
    if (error) {
      throw error
    }
    return {
      id: data.id,
      name: data.name,
      logo: data.logo,
      isActive: data.is_active,
    }
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

  activateWorldById: async (worldId: number) => {
    const { data, error } = await supabase
      .from('worlds')
      .update({ is_active: true })
      .eq('id', worldId)
      .select()
      .single()

    if (error) {
      throw error
    }
    return data
  },

  deactivateWorldById: async (worldId: number) => {
    const { data, error } = await supabase
      .from('worlds')
      .update({ is_active: false })
      .eq('id', worldId)
      .select()
      .single()

    if (error) {
      throw error
    }
    return data
  },

  updateWorld: async (worldId: number, request: UpdateWorldRequest) => {
    const oldWorld = await worldsFetch.getWorldById(worldId)

    let logoUrl: string | null = oldWorld.logo

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
      .update({
        name: request.name,
        logo: logoUrl,
      })
      .eq('id', worldId)
      .select()
      .single()

    if (error) {
      throw error
    }

    if (request.logo && oldWorld.logo) {
      try {
        const urlParts = oldWorld.logo.split('/')
        const bucketIndex = urlParts.findIndex((part) => part === 'world-logos')

        if (bucketIndex !== -1 && bucketIndex < urlParts.length - 1) {
          const filePath = urlParts.slice(bucketIndex + 1).join('/')
          await supabase.storage.from('world-logos').remove([filePath])
        }
      } catch {
        console.error('Failed to remove old world logo')
      }
    }

    return data
  },
}

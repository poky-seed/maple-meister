import type { World } from '@/entities/worlds'
import type { CreateWorldRequest, UpdateWorldRequest } from '@/api/types/request'
import { v4 as uuidv4 } from 'uuid'
import { supabase } from '@/lib/supabase'

const WORLD_LOGOS_BUCKET = 'world-logos'

const getPublicUrl = (filePath: string | null) => {
  if (!filePath) return null
  return supabase.storage.from(WORLD_LOGOS_BUCKET).getPublicUrl(filePath).data.publicUrl
}

export const worldsFetch = {
  getWorlds: async (): Promise<World[]> => {
    const { data, error } = await supabase.from('worlds').select('*').eq('is_active', true)
    if (error) {
      throw error
    }
    return data.map((world) => ({
      id: world.id,
      name: world.name,
      logo: getPublicUrl(world.logo_path),
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
      logo: getPublicUrl(world.logo_path),
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
      logo: getPublicUrl(data.logo_path),
      isActive: data.is_active,
    }
  },

  createWorld: async (request: CreateWorldRequest) => {
    let logoPath: string | null = null

    if (request.logo) {
      const file = request.logo
      const filePath = `${WORLD_LOGOS_BUCKET}/${uuidv4()}`

      const { error } = await supabase.storage.from(WORLD_LOGOS_BUCKET).upload(filePath, file)

      if (error) {
        throw error
      }
      logoPath = filePath
    }

    const { data, error } = await supabase
      .from('worlds')
      .insert({
        name: request.name,
        logo_path: logoPath,
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

  updateWorldById: async (worldId: number, request: UpdateWorldRequest) => {
    const { data: existingWorld, error: preFetchError } = await supabase
      .from('worlds')
      .select('logo_path')
      .eq('id', worldId)
      .single()

    if (preFetchError) {
      throw preFetchError
    }

    let logoPath: string | null = existingWorld.logo_path

    if (request.logo) {
      const file = request.logo
      const filePath = `${WORLD_LOGOS_BUCKET}/${uuidv4()}`

      const { error: uploadError } = await supabase.storage
        .from(WORLD_LOGOS_BUCKET)
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }
      logoPath = filePath
    }

    const { data, error: updateError } = await supabase
      .from('worlds')
      .update({
        name: request.name,
        logo_path: logoPath,
      })
      .eq('id', worldId)
      .select()
      .single()

    if (updateError) {
      throw updateError
    }

    if (request.logo && existingWorld.logo_path) {
      try {
        await supabase.storage.from(WORLD_LOGOS_BUCKET).remove([existingWorld.logo_path])
      } catch {
        console.error('Failed to remove old world logo')
      }
    }

    return data
  },
}

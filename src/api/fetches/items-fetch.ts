import type { Item } from '@/entities/items'
import { supabase } from '@/lib/supabase'
import type { CreateItemRequest } from '../types/request/item-request'
import { v4 as uuidv4 } from 'uuid'

const ITEMS_BUCKET = 'item-images'

const getPublicUrl = (filePath: string | null) => {
  if (!filePath) return null
  return supabase.storage.from('items').getPublicUrl(filePath).data.publicUrl
}

export const itemsFetch = {
  getItems: async (): Promise<Item[]> => {
    const { data, error } = await supabase.from('items').select('*')
    if (error) {
      throw error
    }
    return data.map((item) => ({
      id: item.id,
      name: item.name,
      type: item.item_type,
      imageUrl: getPublicUrl(item.image_path),
    }))
  },

  getItemById: async (id: number): Promise<Item> => {
    const { data, error } = await supabase.from('items').select('*').eq('id', id).single()
    if (error) {
      throw error
    }
    return {
      id: data.id,
      name: data.name,
      type: data.item_type,
      imageUrl: getPublicUrl(data.image_path),
    }
  },

  createItem: async (request: CreateItemRequest) => {
    let imagePath: string | null = null

    if (request.image) {
      const file = request.image
      const filePath = `${ITEMS_BUCKET}/${uuidv4()}`

      const { error: uploadError } = await supabase.storage
        .from(ITEMS_BUCKET)
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }
      imagePath = filePath
    }

    const { data, error } = await supabase
      .from('items')
      .insert({
        name: request.name,
        item_type: request.type,
        image_path: imagePath,
      })
      .select()
      .single()
    if (error) {
      throw error
    }
    return data
  },
}

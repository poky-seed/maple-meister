import type { Item } from '@/entities/items'
import { supabase } from '@/lib/supabase'

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
      imageUrl: item.image_url || null,
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
      imageUrl: data.image_url || null,
    }
  },
}

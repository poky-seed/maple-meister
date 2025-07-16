import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/entities/database'

const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
)

// API 명세에 맞는 응답 타입들
interface RecipeListItem {
  id: number
  name: string
  type: string
  resultItemImageUrl: string
}

interface Item {
  id: number
  name: string
  type: string
  imageUrl: string
}

interface RecipeDetail {
  id: number
  name: string
  type: string
  materials: {
    item: Item
    quantity: number
  }[]
  resultItem: Item
  resultQuantity: number
}

export const recipesFetch = {
  getRecipes: async (): Promise<RecipeListItem[]> => {
    const { data, error } = await supabase.from('recipes').select(`
        id,
        name,
        recipe_type,
        result_items:items!recipes_result_item_id_fkey (
          image_url
        )
      `)

    if (error) {
      throw error
    }

    return data.map((recipe) => ({
      id: recipe.id,
      name: recipe.name,
      type: recipe.recipe_type,
      resultItemImageUrl: recipe.result_items?.image_url || '',
    }))
  },

  getRecipeById: async (recipeId: number): Promise<RecipeDetail> => {
    const { data, error } = await supabase
      .from('recipes')
      .select(
        `
        id,
        name,
        recipe_type,
        result_quantity,
        result_items:items!recipes_result_item_id_fkey (
          id,
          name,
          item_type,
          image_url
        ),
        recipe_materials (
          item_quantity,
          items (
            id,
            name,
            item_type,
            image_url
          )
        )
      `
      )
      .eq('id', recipeId)
      .single()

    if (error) {
      throw error
    }

    return {
      id: data.id,
      name: data.name,
      type: data.recipe_type,
      materials: data.recipe_materials.map((material) => ({
        item: {
          id: material.items!.id,
          name: material.items!.name,
          type: material.items!.item_type,
          imageUrl: material.items!.image_url || '',
        },
        quantity: material.item_quantity,
      })),
      resultItem: {
        id: data.result_items.id,
        name: data.result_items.name,
        type: data.result_items.item_type,
        imageUrl: data.result_items.image_url || '',
      },
      resultQuantity: data.result_quantity,
    }
  },
}

import type { Item } from '@/entities/items'

export interface Recipe {
  id: number
  name: string
  type: string
  requiredLevel: number
  materials: {
    item: Item
    quantity: number
  }[]
  resultItem: Item
  resultQuantity: number
}

export interface RecipeSimple {
  id: number
  name: string
  type: string
  resultItemImageUrl: string | null
}

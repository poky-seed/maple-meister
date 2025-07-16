import { authFetch } from './auth-fetch'
import { itemsFetch } from './items-fetch'
import { recipesFetch } from './recipes-fetch'
import { userFetch } from './user-fetch'
import { worldsFetch } from './worlds-fetch'

export const fetches = {
  worlds: worldsFetch,
  items: itemsFetch,
  recipes: recipesFetch,
  user: userFetch,
  auth: authFetch,
}

# API 설계 명세

- **Base URL**: `/api/v1`

# 목차

## Authentication

- `POST /auth/signup`
- `POST /auth/login`

## Public

- `GET /worlds`
- `GET /items`
- `GET /items/{itemId}`
- `GET /recipes`
- `GET /recipes/{recipeId}`

## Authenticated User

- `GET /profile`

## Admin

- `POST /admin/items`
- `PUT /admin/items/{itemId}`
- `DELETE /admin/items/{itemId}`
- `POST /admin/recipes`
- `PUT /admim/recipes/{recipeId}`
- `PUT /admin/recipes/{recipeId}`
- `POST /admin/worlds`
- `PUT /admin/worlds`
- `DELETE /admin/worlds`

# API

## Authentication

## Public

### `GET /worlds`

```ts
interface WorldResponse {
  id: number
  name: string
}
type WorldListResponse = WorldResponse[]
```

### `GET /items`

```ts
interface ItemResponse {
  id: number
  name: string
  type: string
  imageUrl: string
}
type ItemListResponse = ItemResponse[]
```

### `GET /items/{itemId}`

```ts
interface ItemResponse {
  id: number
  name: string
  type: string
  imageUrl: string
}
```

### `GET /recipes`

```ts
interface RecipeResponse {
  id: number
  name: string
  type: string
  resultItemImageUrl: string
}
type RecipeListResponse = RecipeResponse[]
```

### `GET /recipes/{recipeId}`

```ts
interface Item {
  id: number
  name: string
  type: string
  imageUrl: string
}

interface RecipeResponse {
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
```

## Authenticated User

## Admin

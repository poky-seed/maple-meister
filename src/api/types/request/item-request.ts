export interface CreateItemRequest {
  name: string
  type: string
  image: File | null
}

export interface UpdateItemRequest {
  name: string
  type: string
  image: File | null
}

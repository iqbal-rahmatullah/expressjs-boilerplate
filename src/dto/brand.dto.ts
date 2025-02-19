export type CreateBrandRequest = {
  name: string
}

export type BrandResponse = {
  id: string
  name: string
  createdAt: Date
}

export const toBrandResponse = (data: BrandResponse) => {
  return {
    id: data.id,
    name: data.name,
    createdAt: data.createdAt,
  }
}

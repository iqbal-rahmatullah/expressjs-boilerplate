export type CreatePlatformRequest = {
  name: string
}

export type PlatformResponse = {
  id: string
  name: string
  createdAt: Date
}

export const toPlatformResponse = (data: PlatformResponse) => {
  return {
    id: data.id,
    name: data.name,
    createdAt: data.createdAt,
  }
}

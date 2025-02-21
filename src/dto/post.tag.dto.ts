export type PostTagResponse = {
  id: string
  postId: string
  tagName: string
  creadtedAt: Date
}

export type CreatePostTagRequest = {
  postId: string
  tagName: string
}

export const toPostTagResponse = (data: PostTagResponse) => {
  return {
    id: data.id,
    postId: data.postId,
    tagName: data.tagName,
    createdAt: data.creadtedAt,
  }
}

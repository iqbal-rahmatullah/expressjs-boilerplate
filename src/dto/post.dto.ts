import { PostAttachment, PostTag, Status } from "@prisma/client"
import { BrandResponse } from "./brand.dto"
import { PlatformResponse } from "./platform.dto"

enum PostStatus {
  PENDING = "pending",
  POSTED = "posted",
  CANCELED = "canceled",
}

export type CreatePostRequest = {
  title: string
  brandId: string
  platformId: string
  tagName?: string[]
  dueDate?: string
  status: PostStatus
}

export type PostResponse = {
  id: string
  title: string
  brandId: string
  platformId: string
  dueDate?: Date | null
  status: Status
  createdAt: Date
  updatedAt: Date
  brand?: BrandResponse
  platform?: PlatformResponse
}

export const toPostResponse = (
  data: PostResponse,
  dataAttachments?: PostAttachment[],
  dataTags?: PostTag[]
) => {
  return {
    id: data.id,
    title: data.title,
    brandId: data.brandId,
    brand: data.brand,
    platformId: data.platformId,
    platform: data.platform,
    dueDate: data.dueDate,
    status: data.status,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    attachments: dataAttachments?.map((attachment) => {
      return {
        id: attachment.id,
        postId: attachment.postId,
        fileUrl: attachment.fileUrl,
        type: attachment.type,
        createdAt: attachment.createdAt,
      }
    }),
    tags: dataTags?.map((tag) => {
      return {
        id: tag.id,
        postId: tag.postId,
        name: tag.tagName,
      }
    }),
  }
}

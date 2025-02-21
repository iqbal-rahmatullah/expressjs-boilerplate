import { FileType } from "@prisma/client"

export type PostAttachmentResponse = {
  id: string
  postId: string
  fileUrl: string
  type: FileType
  createdAt: Date
}

export type CreatePostAttachmentRequest = {
  postId: string
  fileUrl: string
  type: FileType
}

export const toPostAttachmentResponse = (data: PostAttachmentResponse) => {
  return {
    id: data.id,
    postId: data.postId,
    fileUrl: data.fileUrl,
    type: data.type,
    createdAt: data.createdAt,
  }
}

export const extensionToFileType: { [key: string]: FileType } = {
  ".jpg": FileType.image,
  ".jpeg": FileType.image,
  ".png": FileType.image,
  ".gif": FileType.image,
  ".webp": FileType.image,

  ".mp4": FileType.video,
  ".mkv": FileType.video,
  ".avi": FileType.video,
  ".mov": FileType.video,

  ".pdf": FileType.file,
  ".docx": FileType.file,
  ".xlsx": FileType.file,
  ".zip": FileType.file,
  ".rar": FileType.file,
}

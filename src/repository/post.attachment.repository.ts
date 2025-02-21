import { FileType } from "@prisma/client"
import prisma from "../utils/prisma"

export class PostAttachmentRepository {
  static async create(postId: string, fileUrl: string, type: FileType) {
    return await prisma.postAttachment.create({
      data: { postId, fileUrl, type },
    })
  }

  static async deleteAttachment(postId: string) {
    return await prisma.postAttachment.deleteMany({ where: { postId } })
  }

  static async findByPostId(postId: string) {
    return await prisma.postAttachment.findMany({ where: { postId } })
  }
}

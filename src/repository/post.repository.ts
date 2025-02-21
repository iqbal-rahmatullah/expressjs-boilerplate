import { CreatePostRequest } from "../dto/post.dto"
import prisma from "../utils/prisma"

export class PostRepository {
  static async findAll() {
    return await prisma.post.findMany({
      include: {
        brand: true,
        platform: true,
        attachments: true,
        tags: true,
      },
    })
  }
  static async create(data: CreatePostRequest) {
    return await prisma.post.create({
      data: {
        title: data.title,
        brandId: data.brandId,
        platformId: data.platformId,
        dueDate: data.dueDate,
        status: data.status,
      },
    })
  }
  static async findById(id: string) {
    return await prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        brand: true,
        platform: true,
        attachments: true,
        tags: true,
      },
    })
  }
  static async update(data: CreatePostRequest, id: string) {
    return await prisma.post.update({
      where: {
        id,
      },
      data: {
        title: data.title,
        brandId: data.brandId,
        platformId: data.platformId,
        dueDate: data.dueDate,
        status: data.status,
      },
      include: {
        attachments: true,
        tags: true,
      },
    })
  }
  static async delete(id: string) {
    return await prisma.post.delete({
      where: {
        id,
      },
      include: {
        attachments: true,
        tags: true,
      },
    })
  }
}

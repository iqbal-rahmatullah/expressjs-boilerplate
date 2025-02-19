import { CreatePlatformRequest } from "../dto/platform.dto"
import prisma from "../utils/prisma"

export class PlatformRepository {
  static async findByName(name: string) {
    return await prisma.platform.findFirst({
      where: {
        name,
      },
    })
  }

  static async create(data: CreatePlatformRequest) {
    return await prisma.platform.create({
      data: {
        name: data.name,
      },
    })
  }

  static async findAll() {
    return await prisma.platform.findMany()
  }

  static async findById(id: string) {
    return await prisma.platform.findFirst({
      where: {
        id,
      },
    })
  }

  static async update(data: CreatePlatformRequest, id: string) {
    return await prisma.platform.update({
      where: {
        id,
      },
      data: {
        name: data.name,
      },
    })
  }

  static async delete(id: string) {
    return await prisma.platform.delete({
      where: {
        id,
      },
    })
  }
}

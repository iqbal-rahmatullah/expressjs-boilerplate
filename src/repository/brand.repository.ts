import { CreateBrandRequest } from "../dto/brand.dto"
import prisma from "../utils/prisma"

export class BrandRepository {
  static async findAll() {
    return await prisma.brand.findMany()
  }

  static async findById(id: string) {
    return await prisma.brand.findFirst({
      where: {
        id,
      },
    })
  }

  static async findByName(name: string) {
    return await prisma.brand.findFirst({
      where: {
        name,
      },
    })
  }

  static async create(data: CreateBrandRequest) {
    return await prisma.brand.create({
      data: {
        name: data.name,
      },
    })
  }

  static async update(data: CreateBrandRequest, id: string) {
    return await prisma.brand.update({
      where: {
        id,
      },
      data: {
        name: data.name,
      },
    })
  }

  static async delete(id: string) {
    return await prisma.brand.delete({
      where: {
        id,
      },
    })
  }
}

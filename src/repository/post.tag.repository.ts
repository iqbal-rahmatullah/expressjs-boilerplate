import prisma from "../utils/prisma"

export class PostTagRepository {
  static async upsertTag(tagName: string, postId: string) {
    return await prisma.postTag.upsert({
      where: { tagName, postId },
      update: {},
      create: { tagName, postId },
    })
  }
  static async deleteTag(id: string) {
    return await prisma.postTag.delete({
      where: {
        id,
      },
    })
  }
  static async deleteTagByPostId(postId: string) {
    return await prisma.postTag.deleteMany({
      where: {
        postId,
      },
    })
  }
}

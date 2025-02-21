import { PrismaClient, Status } from "@prisma/client"
import { v4 as uuidv4 } from "uuid"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Seeding database...")

  // Seed Platform
  const facebook = await prisma.platform.upsert({
    where: { name: "Facebook" },
    update: {},
    create: { id: uuidv4(), name: "Facebook" },
  })

  const instagram = await prisma.platform.upsert({
    where: { name: "Instagram" },
    update: {},
    create: { id: uuidv4(), name: "Instagram" },
  })

  // Seed Brand
  const nike = await prisma.brand.upsert({
    where: { name: "Nike" },
    update: {},
    create: { id: uuidv4(), name: "Nike" },
  })

  const adidas = await prisma.brand.upsert({
    where: { name: "Adidas" },
    update: {},
    create: { id: uuidv4(), name: "Adidas" },
  })

  // Seed Posts
  const post1 = await prisma.post.create({
    data: {
      id: uuidv4(),
      title: "Nike Summer Campaign",
      brandId: nike.id,
      platformId: facebook.id,
      dueDate: new Date("2022-12-31"),
      status: Status.pending,
    },
  })

  const post2 = await prisma.post.create({
    data: {
      id: uuidv4(),
      title: "Adidas Winter Sale",
      brandId: adidas.id,
      platformId: instagram.id,
      dueDate: new Date("2022-12-31"),
      status: Status.posted,
    },
  })

  // Seed Tags
  await prisma.postTag.createMany({
    data: [
      { id: uuidv4(), postId: post1.id, tagName: "campaign" },
      { id: uuidv4(), postId: post2.id, tagName: "sale" },
    ],
  })

  console.log("✅ Seeding completed!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

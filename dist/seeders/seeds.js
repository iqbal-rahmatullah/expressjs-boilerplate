"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const uuid_1 = require("uuid");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("🌱 Seeding database...");
        // Seed Platform
        const facebook = yield prisma.platform.upsert({
            where: { name: "Facebook" },
            update: {},
            create: { id: (0, uuid_1.v4)(), name: "Facebook" },
        });
        const instagram = yield prisma.platform.upsert({
            where: { name: "Instagram" },
            update: {},
            create: { id: (0, uuid_1.v4)(), name: "Instagram" },
        });
        // Seed Brand
        const nike = yield prisma.brand.upsert({
            where: { name: "Nike" },
            update: {},
            create: { id: (0, uuid_1.v4)(), name: "Nike" },
        });
        const adidas = yield prisma.brand.upsert({
            where: { name: "Adidas" },
            update: {},
            create: { id: (0, uuid_1.v4)(), name: "Adidas" },
        });
        // Seed Posts
        const post1 = yield prisma.post.create({
            data: {
                id: (0, uuid_1.v4)(),
                title: "Nike Summer Campaign",
                brandId: nike.id,
                platformId: facebook.id,
                dueDate: new Date("2022-12-31"),
                status: client_1.Status.pending,
            },
        });
        const post2 = yield prisma.post.create({
            data: {
                id: (0, uuid_1.v4)(),
                title: "Adidas Winter Sale",
                brandId: adidas.id,
                platformId: instagram.id,
                dueDate: new Date("2022-12-31"),
                status: client_1.Status.posted,
            },
        });
        // Seed Tags
        yield prisma.postTag.createMany({
            data: [
                { id: (0, uuid_1.v4)(), postId: post1.id, tagName: "campaign" },
                { id: (0, uuid_1.v4)(), postId: post2.id, tagName: "sale" },
            ],
        });
        console.log("✅ Seeding completed!");
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));

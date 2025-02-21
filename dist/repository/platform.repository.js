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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformRepository = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
class PlatformRepository {
    static findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.platform.findFirst({
                where: {
                    name,
                },
            });
        });
    }
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.platform.create({
                data: {
                    name: data.name,
                },
            });
        });
    }
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.platform.findMany();
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.platform.findFirst({
                where: {
                    id,
                },
                include: {
                    posts: true,
                },
            });
        });
    }
    static update(data, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.platform.update({
                where: {
                    id,
                },
                data: {
                    name: data.name,
                },
            });
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.platform.delete({
                where: {
                    id,
                },
            });
        });
    }
}
exports.PlatformRepository = PlatformRepository;

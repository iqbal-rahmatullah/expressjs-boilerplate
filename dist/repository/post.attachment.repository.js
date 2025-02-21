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
exports.PostAttachmentRepository = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
class PostAttachmentRepository {
    static create(postId, fileUrl, type) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.postAttachment.create({
                data: { postId, fileUrl, type },
            });
        });
    }
    static deleteAttachment(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.postAttachment.deleteMany({ where: { postId } });
        });
    }
    static findByPostId(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.postAttachment.findMany({ where: { postId } });
        });
    }
}
exports.PostAttachmentRepository = PostAttachmentRepository;

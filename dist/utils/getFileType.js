"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileType = void 0;
const client_1 = require("@prisma/client");
const post_attachment_dto_1 = require("../dto/post.attachment.dto");
const path_1 = __importDefault(require("path"));
const getFileType = (fileName) => {
    const ext = path_1.default.extname(fileName).toLowerCase();
    return post_attachment_dto_1.extensionToFileType[ext] || client_1.FileType.file;
};
exports.getFileType = getFileType;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extensionToFileType = exports.toPostAttachmentResponse = void 0;
const client_1 = require("@prisma/client");
const toPostAttachmentResponse = (data) => {
    return {
        id: data.id,
        postId: data.postId,
        fileUrl: data.fileUrl,
        type: data.type,
        createdAt: data.createdAt,
    };
};
exports.toPostAttachmentResponse = toPostAttachmentResponse;
exports.extensionToFileType = {
    ".jpg": client_1.FileType.image,
    ".jpeg": client_1.FileType.image,
    ".png": client_1.FileType.image,
    ".gif": client_1.FileType.image,
    ".webp": client_1.FileType.image,
    ".mp4": client_1.FileType.video,
    ".mkv": client_1.FileType.video,
    ".avi": client_1.FileType.video,
    ".mov": client_1.FileType.video,
    ".pdf": client_1.FileType.file,
    ".docx": client_1.FileType.file,
    ".xlsx": client_1.FileType.file,
    ".zip": client_1.FileType.file,
    ".rar": client_1.FileType.file,
};

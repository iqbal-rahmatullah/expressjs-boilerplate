"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPostTagResponse = void 0;
const toPostTagResponse = (data) => {
    return {
        id: data.id,
        postId: data.postId,
        tagName: data.tagName,
        createdAt: data.creadtedAt,
    };
};
exports.toPostTagResponse = toPostTagResponse;

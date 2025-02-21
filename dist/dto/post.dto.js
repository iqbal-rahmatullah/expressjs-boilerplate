"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPostResponse = void 0;
var PostStatus;
(function (PostStatus) {
    PostStatus["PENDING"] = "pending";
    PostStatus["POSTED"] = "posted";
    PostStatus["CANCELED"] = "canceled";
})(PostStatus || (PostStatus = {}));
const toPostResponse = (data, dataAttachments, dataTags) => {
    return {
        id: data.id,
        title: data.title,
        brandId: data.brandId,
        brand: data.brand,
        platformId: data.platformId,
        platform: data.platform,
        dueDate: data.dueDate,
        status: data.status,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        attachments: dataAttachments === null || dataAttachments === void 0 ? void 0 : dataAttachments.map((attachment) => {
            return {
                id: attachment.id,
                postId: attachment.postId,
                fileUrl: attachment.fileUrl,
                type: attachment.type,
                createdAt: attachment.createdAt,
            };
        }),
        tags: dataTags === null || dataTags === void 0 ? void 0 : dataTags.map((tag) => {
            return {
                id: tag.id,
                postId: tag.postId,
                name: tag.tagName,
            };
        }),
    };
};
exports.toPostResponse = toPostResponse;

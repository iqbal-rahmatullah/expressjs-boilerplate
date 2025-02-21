"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostValidation = void 0;
const zod_1 = require("zod");
var PostStatus;
(function (PostStatus) {
    PostStatus["PENDING"] = "pending";
    PostStatus["POSTED"] = "posted";
    PostStatus["CANCELED"] = "canceled";
})(PostStatus || (PostStatus = {}));
class PostValidation {
}
exports.PostValidation = PostValidation;
PostValidation.insert = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    brandId: zod_1.z.string().uuid("Invalid brand ID"),
    platformId: zod_1.z.string().uuid("Invalid platform ID"),
    dueDate: zod_1.z
        .string()
        .optional()
        .refine((date) => !date || !isNaN(Date.parse(date)), {
        message: "Invalid date format",
    }),
    status: zod_1.z.nativeEnum(PostStatus),
});

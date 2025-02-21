"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandValidation = void 0;
const zod_1 = require("zod");
class BrandValidation {
}
exports.BrandValidation = BrandValidation;
BrandValidation.insert = zod_1.z.object({
    name: zod_1.z.string().min(1).max(255),
});

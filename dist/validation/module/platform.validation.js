"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformValidation = void 0;
const zod_1 = require("zod");
class PlatformValidation {
}
exports.PlatformValidation = PlatformValidation;
PlatformValidation.insert = zod_1.z.object({
    name: zod_1.z.string().min(1).max(255),
});

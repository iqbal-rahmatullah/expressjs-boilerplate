"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = exports.swaggerUi = void 0;
// src/docs/swaggerConfig.ts
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
exports.swaggerUi = swagger_ui_express_1.default;
const brand_swagger_1 = require("./module/brand.swagger");
const platform_swagger_1 = require("./module/platform.swagger");
const post_swagger_1 = require("./module/post.swagger");
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API V1 Social Media Todo",
            version: "1.0.0",
            description: "API Documentation",
        },
        components: {
            schemas: {
                PostStatus: {
                    type: "string",
                    enum: ["pending", "posted", "canceled"],
                },
                CreatePostRequest: {
                    type: "object",
                    properties: {
                        title: { type: "string" },
                        brandId: { type: "string" },
                        platformId: { type: "string" },
                        tagName: { type: "array", items: { type: "string" } },
                        dueDate: { type: "string", format: "date-time" },
                        status: { $ref: "#/components/schemas/PostStatus" },
                        attachments: { type: "array", items: { type: "file" } },
                    },
                    required: ["title", "brandId", "platformId", "status"],
                },
                PostResponse: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        title: { type: "string" },
                        brandId: { type: "string" },
                        platformId: { type: "string" },
                        dueDate: { type: "string", format: "date-time", nullable: true },
                        status: { $ref: "#/components/schemas/PostStatus" },
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" },
                        brand: { $ref: "#/components/schemas/BrandResponse" },
                        platform: { $ref: "#/components/schemas/PlatformResponse" },
                        attachments: {
                            type: "array",
                            items: { $ref: "#/components/schemas/PostAttachmentResponse" },
                        },
                        tags: {
                            type: "array",
                            items: { $ref: "#/components/schemas/PostTagResponse" },
                        },
                    },
                },
                PostAttachmentResponse: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        postId: { type: "string" },
                        fileUrl: { type: "string", format: "uri" },
                        type: { type: "string", enum: ["image", "video", "file"] },
                        createdAt: { type: "string", format: "date-time" },
                    },
                },
                CreatePostAttachmentRequest: {
                    type: "object",
                    properties: {
                        postId: { type: "string" },
                        fileUrl: { type: "string", format: "uri" },
                        type: { type: "string", enum: ["image", "video", "file"] },
                    },
                    required: ["postId", "fileUrl", "type"],
                },
                PostTagResponse: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        postId: { type: "string" },
                        tagName: { type: "string" },
                        createdAt: { type: "string", format: "date-time" },
                    },
                },
                CreatePostTagRequest: {
                    type: "object",
                    properties: {
                        postId: { type: "string" },
                        tagName: { type: "string" },
                    },
                    required: ["postId", "tagName"],
                },
                CreatePlatformRequest: {
                    type: "object",
                    properties: {
                        name: { type: "string" },
                    },
                    required: ["name"],
                },
                PlatformResponse: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        name: { type: "string" },
                        createdAt: { type: "string", format: "date-time" },
                    },
                    required: ["id", "name", "createdAt"],
                },
                CreateBrandRequest: {
                    type: "object",
                    properties: {
                        name: { type: "string" },
                    },
                    required: ["name"],
                },
                BrandResponse: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        name: { type: "string" },
                        createdAt: { type: "string", format: "date-time" },
                    },
                    required: ["id", "name", "createdAt"],
                },
            },
        },
        paths: Object.assign(Object.assign(Object.assign({}, post_swagger_1.postDoc), platform_swagger_1.platformDoc), brand_swagger_1.brandDoc),
    },
    apis: ["./src/routes/*.ts"], // Load semua route
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.swaggerSpec = swaggerSpec;

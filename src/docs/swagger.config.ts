// src/docs/swaggerConfig.ts
import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import { brandDoc } from "./module/brand.swagger"
import { platformDoc } from "./module/platform.swagger"
import { postDoc } from "./module/post.swagger"

const options: swaggerJsdoc.Options = {
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
    paths: {
      ...postDoc,
      ...platformDoc,
      ...brandDoc,
    },
  },
  apis: ["./src/routes/*.ts"], // Load semua route
}

const swaggerSpec = swaggerJsdoc(options)

export { swaggerUi, swaggerSpec }

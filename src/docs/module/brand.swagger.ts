export const brandDoc = {
  "/api/v1/brands": {
    get: {
      summary: "Get all brands",
      tags: ["Brand"],
      responses: {
        200: {
          description: "List of brans for the user",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/BrandResponse" },
              },
            },
          },
        },
        404: { description: "Brand Not Found" },
        500: { description: "Internal Server Error" },
      },
    },
    post: {
      summary: "Create a new brand",
      tags: ["Brand"],
      requestBody: {
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/CreateBrandRequest" },
          },
        },
      },
      responses: {
        201: {
          description: "Brand created",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/BrandResponse" },
            },
          },
        },
        400: { description: "Bad Request/Validation error" },
        500: { description: "Internal Server Error" },
      },
    },
  },
  "/api/v1/brands/{id}": {
    get: {
      summary: "Get a brand by ID",
      tags: ["Brand"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
        },
      ],
      responses: {
        200: {
          description: "Brand found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/BrandResponse" },
            },
          },
        },
        404: { description: "Brand Not Found" },
        500: { description: "Internal Server Error" },
      },
    },
    put: {
      summary: "Update a brand by ID",
      tags: ["Brand"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/CreateBrandRequest" },
          },
        },
      },
      responses: {
        200: {
          description: "Brand updated",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/BrandResponse" },
            },
          },
        },
        400: { description: "Bad Request/Validation error" },
        404: { description: "Brand Not Found" },
        500: { description: "Internal Server Error" },
      },
    },
    delete: {
      summary: "Delete a brand by ID",
      tags: ["Brand"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
        },
      ],
      responses: {
        200: { description: "Brand deleted" },
        404: { description: "Brand Not Found" },
        500: { description: "Internal Server Error" },
      },
    },
  },
}

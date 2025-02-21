export const platformDoc = {
  "/api/v1/platforms": {
    get: {
      summary: "Get all platforms",
      tags: ["Platform"],
      responses: {
        200: {
          description: "List of platforms for the user",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/PlatformResponse" },
              },
            },
          },
        },
        404: { description: "Platform Not Found" },
        500: { description: "Internal Server Error" },
      },
    },
    post: {
      summary: "Create new platform",
      tags: ["Platform"],
      requestBody: {
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/CreatePlatformRequest" },
          },
        },
      },
      responses: {
        201: {
          description: "Platform created successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/PlatformResponse" },
            },
          },
        },
        400: { description: "Bad Request/Validation Error" },
        500: { description: "Internal Server Error" },
      },
    },
  },
  "/api/v1/platforms/{id}": {
    get: {
      summary: "Get platform by id",
      tags: ["Platform"],
      parameters: [
        {
          name: "id",
          in: "path",
          description: "Platform id",
          required: true,
          schema: { type: "string" },
        },
      ],
      responses: {
        200: {
          description: "Platform found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/PlatformResponse" },
            },
          },
        },
        404: { description: "Platform Not Found" },
        500: { description: "Internal Server Error" },
      },
    },
    put: {
      summary: "Update platform by id",
      tags: ["Platform"],
      parameters: [
        {
          name: "id",
          in: "path",
          description: "Platform id",
          required: true,
          schema: { type: "string" },
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/CreatePlatformRequest" },
          },
        },
      },
      responses: {
        200: {
          description: "Platform updated successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/PlatformResponse" },
            },
          },
        },
        400: { description: "Bad Request/Validation Error" },
        404: { description: "Platform Not Found" },
        500: { description: "Internal Server Error" },
      },
    },
    delete: {
      summary: "Delete platform by id",
      tags: ["Platform"],
      parameters: [
        {
          name: "id",
          in: "path",
          description: "Platform id",
          required: true,
          schema: { type: "string" },
        },
      ],
      responses: {
        200: { description: "Platform deleted successfully" },
        404: { description: "Platform Not Found" },
        500: { description: "Internal Server Error" },
      },
    },
  },
}

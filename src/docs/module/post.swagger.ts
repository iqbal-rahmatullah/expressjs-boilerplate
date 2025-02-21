export const postDoc = {
  "/api/v1/posts": {
    get: {
      summary: "Get all posts",
      tags: ["Post"],
      responses: {
        200: {
          description: "List of posts for the user",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/PostResponse" },
              },
            },
          },
        },
        404: { description: "Post Not Found" },
        500: { description: "Internal Server Error" },
      },
    },
    post: {
      summary: "Create new post",
      tags: ["Post"],
      requestBody: {
        content: {
          "multipart/form-data": {
            schema: { $ref: "#/components/schemas/CreatePostRequest" },
          },
        },
      },
      responses: {
        201: {
          description: "Post created successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/PostResponse" },
            },
          },
        },
        400: { description: "Bad Request/Validation Error" },
        500: { description: "Internal Server Error" },
      },
    },
  },
  "/api/v1/posts/{id}": {
    get: {
      summary: "Get post by id",
      tags: ["Post"],
      parameters: [
        {
          name: "id",
          in: "path",
          description: "Post id",
          required: true,
          schema: { type: "string" },
        },
      ],
      responses: {
        200: {
          description: "Post found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/PostResponse" },
            },
          },
        },
        404: { description: "Post Not Found" },
        500: { description: "Internal Server Error" },
      },
    },
    put: {
      summary: "Update post by id",
      tags: ["Post"],
      parameters: [
        {
          name: "id",
          in: "path",
          description: "Post id",
          required: true,
          schema: { type: "string" },
        },
      ],
      requestBody: {
        content: {
          "multipart/form-data": {
            schema: { $ref: "#/components/schemas/CreatePostRequest" },
          },
        },
      },
      responses: {
        200: {
          description: "Post updated successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/PostResponse" },
            },
          },
        },
        400: { description: "Bad Request/Validation Error" },
        404: { description: "Post Not Found" },
        500: { description: "Internal Server Error" },
      },
    },
    delete: {
      summary: "Delete post by id",
      tags: ["Post"],
      parameters: [
        {
          name: "id",
          in: "path",
          description: "Post id",
          required: true,
          schema: { type: "string" },
        },
      ],
      responses: {
        200: { description: "Post deleted successfully" },
        404: { description: "Post Not Found" },
        500: { description: "Internal Server Error" },
      },
    },
  },
}

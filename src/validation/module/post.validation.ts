import { z, ZodType } from "zod"

enum PostStatus {
  PENDING = "pending",
  POSTED = "posted",
  CANCELED = "canceled",
}

export class PostValidation {
  static readonly insert: ZodType = z.object({
    title: z.string().min(1, "Title is required"),
    brandId: z.string().uuid("Invalid brand ID"),
    platformId: z.string().uuid("Invalid platform ID"),
    dueDate: z
      .string()
      .optional()
      .refine((date) => !date || !isNaN(Date.parse(date)), {
        message: "Invalid date format",
      }),
    status: z.nativeEnum(PostStatus),
  })
}

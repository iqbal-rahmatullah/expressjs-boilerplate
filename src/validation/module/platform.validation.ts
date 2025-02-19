import { z, ZodType } from "zod"

export class PlatformValidation {
  static readonly insert: ZodType = z.object({
    name: z.string().min(1).max(255),
  })
}

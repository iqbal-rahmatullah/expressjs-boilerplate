import { FileType } from "@prisma/client"
import { extensionToFileType } from "../dto/post.attachment.dto"
import path from "path"

export const getFileType = (fileName: string): FileType => {
  const ext = path.extname(fileName).toLowerCase()
  return extensionToFileType[ext] || FileType.file
}

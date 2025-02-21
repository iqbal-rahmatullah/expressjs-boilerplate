import fileUpload from "express-fileupload"
import {
  CreatePostRequest,
  PostResponse,
  toPostResponse,
} from "../dto/post.dto"
import { BrandRepository } from "../repository/brand.repository"
import { PlatformRepository } from "../repository/platform.repository"
import { PostRepository } from "../repository/post.repository"
import { PostTagRepository } from "../repository/post.tag.repository"
import { PostValidation } from "../validation/module/post.validation"
import { Validation } from "../validation/validation"
import path from "path"
import { ErrorResponse } from "../error/error.response"
import { getFileType } from "../utils/getFileType"
import { PostAttachmentRepository } from "../repository/post.attachment.repository"
import { PostAttachment, PostTag } from "@prisma/client"
import { v4 as uuidv4 } from "uuid"
import fs from "fs"

export class PostService {
  static async createPost(
    data: CreatePostRequest,
    files?: fileUpload.UploadedFile | fileUpload.UploadedFile[]
  ) {
    const validateForm = Validation.validate(PostValidation.insert, data)

    const existBrand = await BrandRepository.findById(data.brandId)

    if (!existBrand) {
      throw new Error("Brand not found")
    }

    const existPlatform = await PlatformRepository.findById(data.platformId)

    if (!existPlatform) {
      throw new Error("Platform not found")
    }

    const createdPost = await PostRepository.create(validateForm)

    let postTags: PostTag[] = []

    if (data.tagName) {
      await Promise.all(
        data.tagName.map(async (tagName: string) => {
          const tag = await PostTagRepository.upsertTag(tagName, createdPost.id)
          postTags.push(tag)
        })
      )
    }

    let postAttachments: PostAttachment[] = []

    if (files) {
      const fileArray = Array.isArray(files) ? files : [files]

      await Promise.all(
        fileArray.map(async (file) => {
          const ext = path.extname(file.name)
          const fileName = uuidv4() + ext
          const fileType = getFileType(file.name)

          const fileUrl = `public/attachments/${fileName}`

          await new Promise<void>((resolve, reject) => {
            file.mv(`./${fileUrl}`, (err) => {
              if (err) reject(new ErrorResponse(err.message, 500))
              resolve()
            })
          })

          postAttachments.push(
            await PostAttachmentRepository.create(
              createdPost.id,
              fileUrl,
              fileType
            )
          )
        })
      )
    }

    return toPostResponse(createdPost, postAttachments, postTags)
  }

  static async findAllPosts(): Promise<PostResponse[]> {
    const allPost = await PostRepository.findAll()

    return allPost.map((post) =>
      toPostResponse(post, post.attachments, post.tags)
    )
  }

  static async findPostById(id: string): Promise<PostResponse> {
    const post = await PostRepository.findById(id)

    if (!post) {
      throw new ErrorResponse("Post not found", 404)
    }

    return toPostResponse(post, post.attachments, post.tags)
  }

  static async deletePost(id: string) {
    const post = await PostRepository.findById(id)

    if (!post) {
      throw new ErrorResponse("Post not found", 404)
    }

    const deletedPost = await PostRepository.delete(id)

    if (deletedPost.attachments.length > 0) {
      await Promise.all([
        ...deletedPost.attachments.map(
          (attachment) =>
            new Promise<void>((resolve, reject) => {
              fs.unlink(attachment.fileUrl, (err) => {
                if (err) return reject(new ErrorResponse(err.message, 500))
                resolve()
              })
            })
        ),

        PostAttachmentRepository.deleteAttachment(deletedPost.id),
      ])
    }

    return toPostResponse(deletedPost)
  }

  static async updatePost(
    id: string,
    data: CreatePostRequest,
    files?: fileUpload.UploadedFile | fileUpload.UploadedFile[]
  ) {
    const validateForm = Validation.validate(PostValidation.insert, data)

    const existPost = await PostRepository.findById(id)
    if (!existPost) {
      throw new ErrorResponse("Post not found", 404)
    }

    const existBrand = await BrandRepository.findById(data.brandId)
    if (!existBrand) {
      throw new ErrorResponse("Brand not found", 404)
    }

    const existPlatform = await PlatformRepository.findById(data.platformId)
    if (!existPlatform) {
      throw new ErrorResponse("Platform not found", 404)
    }

    const updatedPost = await PostRepository.update(validateForm, id)

    let postAttachments: PostAttachment[] = []

    if (files) {
      const oldAttachments = await PostAttachmentRepository.findByPostId(id)

      if (oldAttachments.length > 0) {
        await Promise.all(
          oldAttachments.map(async (attachment) => {
            try {
              await fs.promises.unlink(attachment.fileUrl)
            } catch (err) {
              console.error(`Failed to delete file: ${attachment.fileUrl}`, err)
            }
          })
        )

        await PostAttachmentRepository.deleteAttachment(id)
      }

      const fileArray = Array.isArray(files) ? files : [files]

      await Promise.all(
        fileArray.map(async (file) => {
          const ext = path.extname(file.name)
          const fileName = uuidv4() + ext
          const fileType = getFileType(file.name)
          const fileUrl = `public/attachments/${fileName}`

          await new Promise<void>((resolve, reject) => {
            file.mv(`./${fileUrl}`, (err) => {
              if (err) return reject(new ErrorResponse(err.message, 500))
              resolve()
            })
          })

          postAttachments.push(
            await PostAttachmentRepository.create(id, fileUrl, fileType)
          )
        })
      )
    } else {
      postAttachments = await PostAttachmentRepository.findByPostId(id)
    }

    let postTags: PostTag[] = []

    if (data.tagName) {
      await Promise.all(
        data.tagName.map(async (tagName: string) => {
          const tag = await PostTagRepository.upsertTag(tagName, id)
          postTags.push(tag)
        })
      )
    }

    return toPostResponse(updatedPost, postAttachments, postTags)
  }
}

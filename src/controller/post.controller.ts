import { NextFunction, Request, Response } from "express"
import { CreatePostRequest } from "../dto/post.dto"
import { PostService } from "../service/post.service"

export class PostController {
  static async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const posts = await PostService.findAllPosts()
      res.status(200).json({
        status: "OK",
        data: posts,
      })
    } catch (error) {
      next(error)
    }
  }

  static async create(
    req: Request<{}, {}, CreatePostRequest>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = req.body
      const files = req.files?.attachments

      const newPost = await PostService.createPost(data, files)

      res.status(201).json({
        status: "OK",
        data: newPost,
      })
    } catch (error) {
      next(error)
    }
  }
  static async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const post = await PostService.findPostById(req.params.id)
      res.status(200).json({
        status: "OK",
        data: post,
      })
    } catch (error) {
      next(error)
    }
  }
  static async update(
    req: Request<{ id: string }, {}, CreatePostRequest>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const updatedPost = await PostService.updatePost(
        req.params.id,
        req.body,
        req.files?.attachments
      )

      res.status(200).json({
        status: "OK",
        data: updatedPost,
      })
    } catch (error) {
      next(error)
    }
  }
  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const deletedPost = await PostService.deletePost(req.params.id)

      res.status(200).json({
        status: "OK",
        data: deletedPost,
      })
    } catch (error) {
      next(error)
    }
  }
}

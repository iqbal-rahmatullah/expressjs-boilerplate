import { NextFunction, Request, Response } from "express"
import { CreatePlatformRequest } from "../dto/platform.dto"
import { PlatformService } from "../service/platform.service"

export class PlatformController {
  static async create(
    req: Request<{}, {}, CreatePlatformRequest>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const createdPlatform = await PlatformService.createPlatform(req.body)

      res.status(201).json({
        status: "OK",
        data: createdPlatform,
      })
    } catch (error) {
      next(error)
    }
  }

  static async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const allPlatforms = await PlatformService.findAllPlatforms()

      res.status(200).json({
        status: "OK",
        data: allPlatforms,
      })
    } catch (error) {
      next(error)
    }
  }

  static async findById(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const platform = await PlatformService.findPlatformById(req.params.id)

      res.status(200).json({
        status: "OK",
        data: platform,
      })
    } catch (error) {
      next(error)
    }
  }

  static async update(
    req: Request<{ id: string }, {}, CreatePlatformRequest>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const updatedPlatform = await PlatformService.updatePlatform(
        req.body,
        req.params.id
      )

      res.status(200).json({
        status: "OK",
        data: updatedPlatform,
      })
    } catch (error) {
      next(error)
    }
  }

  static async delete(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
    } catch (error) {
      next(error)
    }
  }
}

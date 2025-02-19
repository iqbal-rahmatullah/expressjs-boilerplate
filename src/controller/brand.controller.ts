import { NextFunction, Request, Response } from "express"
import { BrandService } from "../service/brand.service"
import { CreateBrandRequest } from "../dto/brand.dto"

export class BrandController {
  static async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const allBrands = await BrandService.findAllBrand()

      res.status(200).json({
        status: "OK",
        data: allBrands,
      })
    } catch (error) {
      next(error)
    }
  }

  static async create(
    req: Request<{}, {}, CreateBrandRequest>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const createdBrand = await BrandService.createBrand(req.body)

      res.status(201).json({
        status: "OK",
        data: createdBrand,
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
      const brand = await BrandService.findBrandById(req.params.id)

      res.status(200).json({
        status: "OK",
        data: brand,
      })
    } catch (error) {
      next(error)
    }
  }

  static async update(
    req: Request<{ id: string }, {}, CreateBrandRequest>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const updatedBrand = await BrandService.updateBrand(
        req.body,
        req.params.id
      )

      res.status(200).json({
        status: "OK",
        data: updatedBrand,
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
      const deletedBrand = await BrandService.deleteBrand(req.params.id)

      res.status(200).json({
        status: "OK",
        data: deletedBrand,
      })
    } catch (error) {
      next(error)
    }
  }
}

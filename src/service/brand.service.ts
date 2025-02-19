import {
  BrandResponse,
  CreateBrandRequest,
  toBrandResponse,
} from "../dto/brand.dto"
import { ErrorResponse } from "../error/error.response"
import { BrandRepository } from "../repository/brand.repository"
import { BrandValidation } from "../validation/module/brand.validation"
import { Validation } from "../validation/validation"

export class BrandService {
  static async findAllBrand(): Promise<BrandResponse[]> {
    const allBrands = await BrandRepository.findAll()

    if (!allBrands) {
      throw new ErrorResponse("No brands found", 404)
    }

    return allBrands.map((brand) => toBrandResponse(brand))
  }

  static async createBrand(data: CreateBrandRequest) {
    const validateBrand = await Validation.validate(
      BrandValidation.insert,
      data
    )

    const alreadyExistBrand = await BrandRepository.findByName(data.name)
    if (alreadyExistBrand) {
      throw new ErrorResponse("Brand already exist", 409)
    }

    const createdBrand = await BrandRepository.create(data)
    return toBrandResponse(createdBrand)
  }

  static async findBrandById(id: string): Promise<BrandResponse> {
    const brand = await BrandRepository.findById(id)

    if (!brand) {
      throw new ErrorResponse("Brand not found", 404)
    }

    return toBrandResponse(brand)
  }

  static async updateBrand(data: CreateBrandRequest, id: string) {
    const validateBrand = await Validation.validate(
      BrandValidation.insert,
      data
    )

    const existBrandId = await BrandRepository.findById(id)

    if (!existBrandId) {
      throw new ErrorResponse("Brand not found", 404)
    }

    const alredyExistBrand = await BrandRepository.findByName(data.name)
    if (alredyExistBrand) {
      throw new ErrorResponse("Brand already exist", 409)
    }

    const updatedBrand = await BrandRepository.update(data, id)

    return toBrandResponse(updatedBrand)
  }

  static async deleteBrand(id: string) {
    const brand = await BrandRepository.findById(id)

    if (!brand) {
      throw new ErrorResponse("Brand not found", 404)
    }

    const deletedBrand = await BrandRepository.delete(id)

    return toBrandResponse(deletedBrand)
  }
}

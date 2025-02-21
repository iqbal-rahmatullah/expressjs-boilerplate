import {
  CreatePlatformRequest,
  PlatformResponse,
  toPlatformResponse,
} from "../dto/platform.dto"
import { ErrorResponse } from "../error/error.response"
import { PlatformRepository } from "../repository/platform.repository"
import { PostRepository } from "../repository/post.repository"
import { PlatformValidation } from "../validation/module/platform.validation"
import { Validation } from "../validation/validation"

export class PlatformService {
  static async createPlatform(data: CreatePlatformRequest) {
    const platformValidation = Validation.validate(
      PlatformValidation.insert,
      data
    )

    const alreadyExistPlatform = await PlatformRepository.findByName(data.name)
    if (alreadyExistPlatform) {
      throw new ErrorResponse("Platform already exist", 409)
    }

    const createdPlatform = await PlatformRepository.create(data)

    return toPlatformResponse(createdPlatform)
  }

  static async findAllPlatforms(): Promise<PlatformResponse[]> {
    const allPlatforms = await PlatformRepository.findAll()

    if (allPlatforms.length === 0) {
      throw new ErrorResponse("No platforms found", 404)
    }

    return allPlatforms.map((platform) => toPlatformResponse(platform))
  }

  static async findPlatformById(id: string): Promise<PlatformResponse> {
    const platform = await PlatformRepository.findById(id)

    if (!platform) {
      throw new ErrorResponse("Platform not found", 404)
    }

    return toPlatformResponse(platform)
  }

  static async updatePlatform(data: CreatePlatformRequest, id: string) {
    const platformValidation = Validation.validate(
      PlatformValidation.insert,
      data
    )

    const alreadyExistPlatformId = await PlatformRepository.findById(id)

    if (!alreadyExistPlatformId) {
      throw new ErrorResponse("Platform not found", 404)
    }

    const alreadyExistPlatform = await PlatformRepository.findByName(data.name)
    if (alreadyExistPlatform) {
      throw new ErrorResponse("Platform already exist", 409)
    }

    const updatedPlatform = await PlatformRepository.update(data, id)

    return toPlatformResponse(updatedPlatform)
  }

  static async deletePlarform(id: string) {
    const existPlatform = await PlatformRepository.findById(id)

    if (!existPlatform) {
      throw new ErrorResponse("Platform not found", 404)
    }

    if (existPlatform.posts) {
      await Promise.all(
        existPlatform.posts.map(async (post) => {
          await PostRepository.delete(post.id)
        })
      )
    }

    const deletedPlatform = await PlatformRepository.delete(id)

    return toPlatformResponse(deletedPlatform)
  }
}

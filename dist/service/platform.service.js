"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformService = void 0;
const platform_dto_1 = require("../dto/platform.dto");
const error_response_1 = require("../error/error.response");
const platform_repository_1 = require("../repository/platform.repository");
const post_repository_1 = require("../repository/post.repository");
const platform_validation_1 = require("../validation/module/platform.validation");
const validation_1 = require("../validation/validation");
class PlatformService {
    static createPlatform(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const platformValidation = validation_1.Validation.validate(platform_validation_1.PlatformValidation.insert, data);
            const alreadyExistPlatform = yield platform_repository_1.PlatformRepository.findByName(data.name);
            if (alreadyExistPlatform) {
                throw new error_response_1.ErrorResponse("Platform already exist", 409);
            }
            const createdPlatform = yield platform_repository_1.PlatformRepository.create(data);
            return (0, platform_dto_1.toPlatformResponse)(createdPlatform);
        });
    }
    static findAllPlatforms() {
        return __awaiter(this, void 0, void 0, function* () {
            const allPlatforms = yield platform_repository_1.PlatformRepository.findAll();
            if (allPlatforms.length === 0) {
                throw new error_response_1.ErrorResponse("No platforms found", 404);
            }
            return allPlatforms.map((platform) => (0, platform_dto_1.toPlatformResponse)(platform));
        });
    }
    static findPlatformById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const platform = yield platform_repository_1.PlatformRepository.findById(id);
            if (!platform) {
                throw new error_response_1.ErrorResponse("Platform not found", 404);
            }
            return (0, platform_dto_1.toPlatformResponse)(platform);
        });
    }
    static updatePlatform(data, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const platformValidation = validation_1.Validation.validate(platform_validation_1.PlatformValidation.insert, data);
            const alreadyExistPlatformId = yield platform_repository_1.PlatformRepository.findById(id);
            if (!alreadyExistPlatformId) {
                throw new error_response_1.ErrorResponse("Platform not found", 404);
            }
            const alreadyExistPlatform = yield platform_repository_1.PlatformRepository.findByName(data.name);
            if (alreadyExistPlatform) {
                throw new error_response_1.ErrorResponse("Platform already exist", 409);
            }
            const updatedPlatform = yield platform_repository_1.PlatformRepository.update(data, id);
            return (0, platform_dto_1.toPlatformResponse)(updatedPlatform);
        });
    }
    static deletePlarform(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existPlatform = yield platform_repository_1.PlatformRepository.findById(id);
            if (!existPlatform) {
                throw new error_response_1.ErrorResponse("Platform not found", 404);
            }
            if (existPlatform.posts) {
                yield Promise.all(existPlatform.posts.map((post) => __awaiter(this, void 0, void 0, function* () {
                    yield post_repository_1.PostRepository.delete(post.id);
                })));
            }
            const deletedPlatform = yield platform_repository_1.PlatformRepository.delete(id);
            return (0, platform_dto_1.toPlatformResponse)(deletedPlatform);
        });
    }
}
exports.PlatformService = PlatformService;

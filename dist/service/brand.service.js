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
exports.BrandService = void 0;
const brand_dto_1 = require("../dto/brand.dto");
const error_response_1 = require("../error/error.response");
const brand_repository_1 = require("../repository/brand.repository");
const post_repository_1 = require("../repository/post.repository");
const brand_validation_1 = require("../validation/module/brand.validation");
const validation_1 = require("../validation/validation");
class BrandService {
    static findAllBrand() {
        return __awaiter(this, void 0, void 0, function* () {
            const allBrands = yield brand_repository_1.BrandRepository.findAll();
            if (!allBrands) {
                throw new error_response_1.ErrorResponse("No brands found", 404);
            }
            return allBrands.map((brand) => (0, brand_dto_1.toBrandResponse)(brand));
        });
    }
    static createBrand(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const validateBrand = yield validation_1.Validation.validate(brand_validation_1.BrandValidation.insert, data);
            const alreadyExistBrand = yield brand_repository_1.BrandRepository.findByName(data.name);
            if (alreadyExistBrand) {
                throw new error_response_1.ErrorResponse("Brand already exist", 409);
            }
            const createdBrand = yield brand_repository_1.BrandRepository.create(validateBrand);
            return (0, brand_dto_1.toBrandResponse)(createdBrand);
        });
    }
    static findBrandById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const brand = yield brand_repository_1.BrandRepository.findById(id);
            if (!brand) {
                throw new error_response_1.ErrorResponse("Brand not found", 404);
            }
            return (0, brand_dto_1.toBrandResponse)(brand);
        });
    }
    static updateBrand(data, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const validateBrand = yield validation_1.Validation.validate(brand_validation_1.BrandValidation.insert, data);
            const existBrandId = yield brand_repository_1.BrandRepository.findById(id);
            if (!existBrandId) {
                throw new error_response_1.ErrorResponse("Brand not found", 404);
            }
            const alredyExistBrand = yield brand_repository_1.BrandRepository.findByName(data.name);
            if (alredyExistBrand) {
                throw new error_response_1.ErrorResponse("Brand already exist", 409);
            }
            const updatedBrand = yield brand_repository_1.BrandRepository.update(data, id);
            return (0, brand_dto_1.toBrandResponse)(updatedBrand);
        });
    }
    static deleteBrand(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const brand = yield brand_repository_1.BrandRepository.findById(id);
            if (!brand) {
                throw new error_response_1.ErrorResponse("Brand not found", 404);
            }
            if (brand.posts) {
                yield Promise.all(brand.posts.map((post) => __awaiter(this, void 0, void 0, function* () {
                    yield post_repository_1.PostRepository.delete(post.id);
                })));
            }
            const deletedBrand = yield brand_repository_1.BrandRepository.delete(id);
            return (0, brand_dto_1.toBrandResponse)(deletedBrand);
        });
    }
}
exports.BrandService = BrandService;

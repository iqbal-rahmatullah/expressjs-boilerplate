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
exports.BrandController = void 0;
const brand_service_1 = require("../service/brand.service");
class BrandController {
    static findAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allBrands = yield brand_service_1.BrandService.findAllBrand();
                res.status(200).json({
                    status: "OK",
                    data: allBrands,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdBrand = yield brand_service_1.BrandService.createBrand(req.body);
                res.status(201).json({
                    status: "OK",
                    data: createdBrand,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static findById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const brand = yield brand_service_1.BrandService.findBrandById(req.params.id);
                res.status(200).json({
                    status: "OK",
                    data: brand,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedBrand = yield brand_service_1.BrandService.updateBrand(req.body, req.params.id);
                res.status(200).json({
                    status: "OK",
                    data: updatedBrand,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedBrand = yield brand_service_1.BrandService.deleteBrand(req.params.id);
                res.status(200).json({
                    status: "OK",
                    data: deletedBrand,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.BrandController = BrandController;

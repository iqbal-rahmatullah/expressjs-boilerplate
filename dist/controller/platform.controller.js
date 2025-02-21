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
exports.PlatformController = void 0;
const platform_service_1 = require("../service/platform.service");
class PlatformController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdPlatform = yield platform_service_1.PlatformService.createPlatform(req.body);
                res.status(201).json({
                    status: "OK",
                    data: createdPlatform,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static findAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allPlatforms = yield platform_service_1.PlatformService.findAllPlatforms();
                res.status(200).json({
                    status: "OK",
                    data: allPlatforms,
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
                const platform = yield platform_service_1.PlatformService.findPlatformById(req.params.id);
                res.status(200).json({
                    status: "OK",
                    data: platform,
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
                const updatedPlatform = yield platform_service_1.PlatformService.updatePlatform(req.body, req.params.id);
                res.status(200).json({
                    status: "OK",
                    data: updatedPlatform,
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
                const deletedPlatform = yield platform_service_1.PlatformService.deletePlarform(req.params.id);
                res.status(200).json({
                    status: "OK",
                    data: deletedPlatform,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.PlatformController = PlatformController;

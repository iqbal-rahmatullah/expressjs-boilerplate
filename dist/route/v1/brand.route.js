"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const brand_controller_1 = require("../../controller/brand.controller");
const router = express_1.default.Router();
router.get("/", brand_controller_1.BrandController.findAll);
router.post("/", brand_controller_1.BrandController.create);
router.get("/:id", brand_controller_1.BrandController.findById);
router.put("/:id", brand_controller_1.BrandController.update);
router.delete("/:id", brand_controller_1.BrandController.delete);
exports.default = router;

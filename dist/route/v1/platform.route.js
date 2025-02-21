"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const platform_controller_1 = require("../../controller/platform.controller");
const router = express_1.default.Router();
router.get("/", platform_controller_1.PlatformController.findAll);
router.post("/", platform_controller_1.PlatformController.create);
router.get("/:id", platform_controller_1.PlatformController.findById);
router.put("/:id", platform_controller_1.PlatformController.update);
router.delete("/:id", platform_controller_1.PlatformController.delete);
exports.default = router;

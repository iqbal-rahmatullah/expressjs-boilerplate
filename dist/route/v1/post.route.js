"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_controller_1 = require("../../controller/post.controller");
const router = express_1.default.Router();
router.get("/", post_controller_1.PostController.findAll);
router.post("/", post_controller_1.PostController.create);
router.get("/:id", post_controller_1.PostController.findById);
router.delete("/:id", post_controller_1.PostController.delete);
router.put("/:id", post_controller_1.PostController.update);
exports.default = router;

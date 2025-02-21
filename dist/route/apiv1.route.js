"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const platform_route_1 = __importDefault(require("./v1/platform.route"));
const brand_route_1 = __importDefault(require("./v1/brand.route"));
const post_route_1 = __importDefault(require("./v1/post.route"));
const swagger_config_1 = require("../docs/swagger.config");
const router = express_1.default.Router();
router.use("/platforms", platform_route_1.default);
router.use("/brands", brand_route_1.default);
router.use("/posts", post_route_1.default);
router.use("/docs", swagger_config_1.swaggerUi.serve, swagger_config_1.swaggerUi.setup(swagger_config_1.swaggerSpec));
exports.default = router;

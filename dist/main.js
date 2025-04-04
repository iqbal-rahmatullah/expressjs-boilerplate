"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const apiv1_route_1 = __importDefault(require("./route/apiv1.route"));
const error_middleware_1 = require("./middleware/error.middleware");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static("./public"));
app.use((0, express_fileupload_1.default)());
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
app.use("/api/v1", apiv1_route_1.default);
app.use(error_middleware_1.errorMiddleware);

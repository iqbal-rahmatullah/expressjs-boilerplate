"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const zod_1 = require("zod");
const error_response_1 = require("../error/error.response");
const errorMiddleware = (error, req, res, next) => {
    if (error instanceof zod_1.ZodError) {
        res.status(400).json({
            status: "error",
            message: "Validation Error",
            details: error.errors.map((err) => {
                return {
                    message: err.message,
                };
            }),
        });
    }
    else if (error instanceof error_response_1.ErrorResponse) {
        res.status(error.statusCode).json({
            status: "error",
            message: error.message,
        });
    }
    else {
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
            details: error.message,
        });
    }
};
exports.errorMiddleware = errorMiddleware;

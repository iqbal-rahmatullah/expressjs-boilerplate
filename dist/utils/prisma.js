"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const logger_1 = require("./logger");
const prisma = new client_1.PrismaClient({
    log: [
        {
            emit: "event",
            level: "query",
        },
        {
            emit: "event",
            level: "error",
        },
        {
            emit: "event",
            level: "info",
        },
        {
            emit: "event",
            level: "warn",
        },
    ],
});
prisma.$on("error", (e) => {
    logger_1.logger.error(e);
});
prisma.$on("warn", (e) => {
    logger_1.logger.warn(e);
});
prisma.$on("info", (e) => {
    logger_1.logger.info(e);
});
prisma.$on("query", (e) => {
    logger_1.logger.info(e);
});
exports.default = prisma;

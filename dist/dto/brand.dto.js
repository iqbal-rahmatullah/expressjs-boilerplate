"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBrandResponse = void 0;
const toBrandResponse = (data) => {
    return {
        id: data.id,
        name: data.name,
        createdAt: data.createdAt,
    };
};
exports.toBrandResponse = toBrandResponse;

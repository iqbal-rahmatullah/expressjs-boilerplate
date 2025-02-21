"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPlatformResponse = void 0;
const toPlatformResponse = (data) => {
    return {
        id: data.id,
        name: data.name,
        createdAt: data.createdAt,
    };
};
exports.toPlatformResponse = toPlatformResponse;

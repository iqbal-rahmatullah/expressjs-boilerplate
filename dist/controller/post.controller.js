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
exports.PostController = void 0;
const post_service_1 = require("../service/post.service");
class PostController {
    static findAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield post_service_1.PostService.findAllPosts();
                res.status(200).json({
                    status: "OK",
                    data: posts,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const data = req.body;
                const files = (_a = req.files) === null || _a === void 0 ? void 0 : _a.attachments;
                const newPost = yield post_service_1.PostService.createPost(data, files);
                res.status(201).json({
                    status: "OK",
                    data: newPost,
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
                const post = yield post_service_1.PostService.findPostById(req.params.id);
                res.status(200).json({
                    status: "OK",
                    data: post,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const updatedPost = yield post_service_1.PostService.updatePost(req.params.id, req.body, (_a = req.files) === null || _a === void 0 ? void 0 : _a.attachments);
                res.status(200).json({
                    status: "OK",
                    data: updatedPost,
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
                const deletedPost = yield post_service_1.PostService.deletePost(req.params.id);
                res.status(200).json({
                    status: "OK",
                    data: deletedPost,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.PostController = PostController;

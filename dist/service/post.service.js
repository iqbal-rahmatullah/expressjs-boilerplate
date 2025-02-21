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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const post_dto_1 = require("../dto/post.dto");
const brand_repository_1 = require("../repository/brand.repository");
const platform_repository_1 = require("../repository/platform.repository");
const post_repository_1 = require("../repository/post.repository");
const post_tag_repository_1 = require("../repository/post.tag.repository");
const post_validation_1 = require("../validation/module/post.validation");
const validation_1 = require("../validation/validation");
const path_1 = __importDefault(require("path"));
const error_response_1 = require("../error/error.response");
const getFileType_1 = require("../utils/getFileType");
const post_attachment_repository_1 = require("../repository/post.attachment.repository");
const uuid_1 = require("uuid");
const fs_1 = __importDefault(require("fs"));
class PostService {
    static createPost(data, files) {
        return __awaiter(this, void 0, void 0, function* () {
            const validateForm = validation_1.Validation.validate(post_validation_1.PostValidation.insert, data);
            const existBrand = yield brand_repository_1.BrandRepository.findById(data.brandId);
            if (!existBrand) {
                throw new Error("Brand not found");
            }
            const existPlatform = yield platform_repository_1.PlatformRepository.findById(data.platformId);
            if (!existPlatform) {
                throw new Error("Platform not found");
            }
            const createdPost = yield post_repository_1.PostRepository.create(validateForm);
            let postTags = [];
            if (data.tagName) {
                const tagNames = Array.isArray(data.tagName)
                    ? data.tagName
                    : data.tagName.split(",");
                yield Promise.all(tagNames.map((tagName) => __awaiter(this, void 0, void 0, function* () {
                    const tag = yield post_tag_repository_1.PostTagRepository.upsertTag(tagName, createdPost.id);
                    postTags.push(tag);
                })));
            }
            let postAttachments = [];
            if (files) {
                const fileArray = Array.isArray(files) ? files : [files];
                yield Promise.all(fileArray.map((file) => __awaiter(this, void 0, void 0, function* () {
                    const ext = path_1.default.extname(file.name);
                    const fileName = (0, uuid_1.v4)() + ext;
                    const fileType = (0, getFileType_1.getFileType)(file.name);
                    const fileUrl = `public/attachments/${fileName}`;
                    yield new Promise((resolve, reject) => {
                        file.mv(`./${fileUrl}`, (err) => {
                            if (err)
                                reject(new error_response_1.ErrorResponse(err.message, 500));
                            resolve();
                        });
                    });
                    postAttachments.push(yield post_attachment_repository_1.PostAttachmentRepository.create(createdPost.id, fileUrl, fileType));
                })));
            }
            return (0, post_dto_1.toPostResponse)(createdPost, postAttachments, postTags);
        });
    }
    static findAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const allPost = yield post_repository_1.PostRepository.findAll();
            return allPost.map((post) => (0, post_dto_1.toPostResponse)(post, post.attachments, post.tags));
        });
    }
    static findPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield post_repository_1.PostRepository.findById(id);
            if (!post) {
                throw new error_response_1.ErrorResponse("Post not found", 404);
            }
            return (0, post_dto_1.toPostResponse)(post, post.attachments, post.tags);
        });
    }
    static deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield post_repository_1.PostRepository.findById(id);
            if (!post) {
                throw new error_response_1.ErrorResponse("Post not found", 404);
            }
            const deletedPost = yield post_repository_1.PostRepository.delete(id);
            if (deletedPost.attachments.length > 0) {
                yield Promise.all([
                    ...deletedPost.attachments.map((attachment) => new Promise((resolve, reject) => {
                        fs_1.default.unlink(attachment.fileUrl, (err) => {
                            if (err)
                                return reject(new error_response_1.ErrorResponse(err.message, 500));
                            resolve();
                        });
                    })),
                    post_attachment_repository_1.PostAttachmentRepository.deleteAttachment(deletedPost.id),
                ]);
            }
            return (0, post_dto_1.toPostResponse)(deletedPost);
        });
    }
    static updatePost(id, data, files) {
        return __awaiter(this, void 0, void 0, function* () {
            const validateForm = validation_1.Validation.validate(post_validation_1.PostValidation.insert, data);
            const existPost = yield post_repository_1.PostRepository.findById(id);
            if (!existPost) {
                throw new error_response_1.ErrorResponse("Post not found", 404);
            }
            const existBrand = yield brand_repository_1.BrandRepository.findById(data.brandId);
            if (!existBrand) {
                throw new error_response_1.ErrorResponse("Brand not found", 404);
            }
            const existPlatform = yield platform_repository_1.PlatformRepository.findById(data.platformId);
            if (!existPlatform) {
                throw new error_response_1.ErrorResponse("Platform not found", 404);
            }
            const updatedPost = yield post_repository_1.PostRepository.update(validateForm, id);
            let postAttachments = [];
            if (files) {
                const oldAttachments = yield post_attachment_repository_1.PostAttachmentRepository.findByPostId(id);
                if (oldAttachments.length > 0) {
                    yield Promise.all(oldAttachments.map((attachment) => __awaiter(this, void 0, void 0, function* () {
                        try {
                            yield fs_1.default.promises.unlink(attachment.fileUrl);
                        }
                        catch (err) {
                            console.error(`Failed to delete file: ${attachment.fileUrl}`, err);
                        }
                    })));
                    yield post_attachment_repository_1.PostAttachmentRepository.deleteAttachment(id);
                }
                const fileArray = Array.isArray(files) ? files : [files];
                yield Promise.all(fileArray.map((file) => __awaiter(this, void 0, void 0, function* () {
                    const ext = path_1.default.extname(file.name);
                    const fileName = (0, uuid_1.v4)() + ext;
                    const fileType = (0, getFileType_1.getFileType)(file.name);
                    const fileUrl = `public/attachments/${fileName}`;
                    yield new Promise((resolve, reject) => {
                        file.mv(`./${fileUrl}`, (err) => {
                            if (err)
                                return reject(new error_response_1.ErrorResponse(err.message, 500));
                            resolve();
                        });
                    });
                    postAttachments.push(yield post_attachment_repository_1.PostAttachmentRepository.create(id, fileUrl, fileType));
                })));
            }
            else {
                postAttachments = yield post_attachment_repository_1.PostAttachmentRepository.findByPostId(id);
            }
            let postTags = [];
            if (data.tagName) {
                const tagNames = Array.isArray(data.tagName)
                    ? data.tagName
                    : data.tagName.split(",");
                yield post_tag_repository_1.PostTagRepository.deleteTagByPostId(id);
                yield Promise.all(tagNames.map((tagName) => __awaiter(this, void 0, void 0, function* () {
                    const tag = yield post_tag_repository_1.PostTagRepository.upsertTag(tagName, id);
                    postTags.push(tag);
                })));
            }
            return (0, post_dto_1.toPostResponse)(updatedPost, postAttachments, postTags);
        });
    }
}
exports.PostService = PostService;

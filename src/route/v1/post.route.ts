import express from "express"
import { PostController } from "../../controller/post.controller"

const router = express.Router()

router.get("/", PostController.findAll)
router.post("/", PostController.create)
router.get("/:id", PostController.findById)
router.delete("/:id", PostController.delete)
router.put("/:id", PostController.update)

export default router

import express from "express"
import { BrandController } from "../../controller/brand.controller"

const router = express.Router()

router.get("/", BrandController.findAll)
router.post("/", BrandController.create)
router.get("/:id", BrandController.findById)
router.put("/:id", BrandController.update)
router.delete("/:id", BrandController.delete)

export default router

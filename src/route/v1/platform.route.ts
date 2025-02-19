import express from "express"
import { PlatformController } from "../../controller/platform.controller"

const router = express.Router()

router.get("/", PlatformController.findAll)
router.post("/", PlatformController.create)
router.get("/:id", PlatformController.findById)
router.put("/:id", PlatformController.update)
router.delete("/:id", PlatformController.delete)

export default router

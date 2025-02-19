import express from "express"
import platformRoute from "./v1/platform.route"
import brandRoute from "./v1/brand.route"

const router = express.Router()

router.use("/platforms", platformRoute)
router.use("/brands", brandRoute)

export default router

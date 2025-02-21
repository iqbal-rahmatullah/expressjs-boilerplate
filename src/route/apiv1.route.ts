import express from "express"
import platformRoute from "./v1/platform.route"
import brandRoute from "./v1/brand.route"
import postRoute from "./v1/post.route"
import { swaggerSpec, swaggerUi } from "../docs/swagger.config"

const router = express.Router()

router.use("/platforms", platformRoute)
router.use("/brands", brandRoute)
router.use("/posts", postRoute)
router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export default router

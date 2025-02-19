import express from "express"
import platformRoute from "./v1/platform.route"

const router = express.Router()

router.use("/platforms", platformRoute)

export default router

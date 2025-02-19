import express from "express"
import cors from "cors"
import FileUpload from "express-fileupload"
import apiV1Route from "./route/apiv1.route"
import { errorMiddleware } from "./middleware/error.middleware"

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("./public"))
app.use(FileUpload())

app.listen(3000, () => {
  console.log("Server is running on port 3000")
})

app.use("/api/v1", apiV1Route)

app.use(errorMiddleware)

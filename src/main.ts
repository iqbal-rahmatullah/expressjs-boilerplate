import express from "express"
import cors from "cors"
import FileUpload from "express-fileupload"

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("./public"))
app.use(FileUpload())

app.listen(3000, () => {
  console.log("Server is running on port 3000")
})

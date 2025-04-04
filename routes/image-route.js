import express from "express"
import { upload } from "../utility/multer.js"
import imageModal from "../model/image-model.js"

const route = express.Router()

route.get("/", async (req, res) => {
  const image = await imageModal.find()
  res.json({
    message: "File found successfully",
    fileUrl: image,
  });
})


route.post("/", upload.single("image"), async (req, res) => {
  const fileUrl = `/uploads/${req.file.filename}`;

  const image = await imageModal.create({
    image: fileUrl
  })

  res.json({
    success: true,
    message: "File uploaded successfully",
    fileUrl: image,
  });
  console.log(req.file);

})

export default route
import express from "express"
import { uploadMultipuleFile } from "../utility/Cloudinary.js"
import imageModal from "../model/image-model.js"

const route = express.Router()

// route.get("/", async (req, res) => {
//   const image = await imageModal.find()
//   res.json({
//     message: "File found successfully",
//     fileUrl: image,
//   });
// })


route.post("/", uploadMultipuleFile, async (req, res) => {
  res.json({
    success: true,
    message: "File uploaded successfully",
    fileUrl: req.files,
  });
  console.log(req.files);

})

export default route
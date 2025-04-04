import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  image: {
    type: String,
    requre: [true, "image is required"]
  },
  createdAt: {
    type: Date,
    default: new Date(Date.now())
  }
})

const imageModal = mongoose.model("images", imageSchema)

export default imageModal
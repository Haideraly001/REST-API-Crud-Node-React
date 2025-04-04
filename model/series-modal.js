import mongoose from "mongoose";

const seriesSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Series Name is required"]
  },
  description: {
    type: String,
    require: [true, "Series description Name is required"]
  },
  rating: {
    type: Number,
    require: [true, "Rating Name is required"]
  },
  duration: {
    type: Number,
    require: [true, "Duration Name is required"]
  },
  actors: {
    type: [String],
    require: [true, "At least one Actor Name is required"]
  },
  director: {
    type: [String],
    require: [true, "Director Name is required"]
  },
  price: {
    type: Number,
    require: [true, "Price  is required"]
  },
  createdAt: {
    type: Date,
    default: new Date(Date.now())
  },
})

const seriesModal = mongoose.model("series", seriesSchema)

export default seriesModal
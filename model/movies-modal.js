import mongoose from "mongoose";


const moviesSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Movie Name is required"]
  },
  duration: {
    type: Number,
    require: [true, "duration is required"]
  },
  rating: {
    type: Number,
    require: [true, "rating is required"]
  },
  price: {
    type: Number,
    default: [true, "price is required"]
  },
  directors: {
    type: [String],
    default: [true, "genru is required"]
  },
  releaseYear: {
    type: Date,
    require: [true, "Release Year is required"]
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  genre: {
    type: [String],
    default: [true, "genre is required"]
  },


})

const moviesModal = mongoose.model("new-movies", moviesSchema)

export default moviesModal
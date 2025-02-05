import mongoose from "mongoose"

const movieScheema = new mongoose.Schema({

  name: {
    type: String,
    required: [true, "Name feild is required"],
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    required: [true, "description feild is required"],
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, "Duration feild is required"],
  },
  rating: {
    type: Number,
  },
  totalRating: {
    type: Number,
  },
  releaseYear: {
    type: Number,
    required: [true, "Release Year feild is required"]
  },
  releaseDate: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  genres: {
    type: [String],
    required: [true, "genres feild is required"]
  },
  directors: {
    type: [String],
    required: [true, "Director feild is required"]
  },
  coverImage: {
    type: String,
    required: [true, "Cover Image feild is required"]
  },
  actor: {
    type: [String],
    requried: [true, "actor feild is required"]
  },
  price: {
    type: String,
    requried: [true, "price feild is required"]
  }
})

const moviesModal = mongoose.model("firstMovies", movieScheema)
export default moviesModal
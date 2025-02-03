import mongoose from "mongoose"

const movieScheema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true
  }
})

const moviesModal = mongoose.model("firstMovies", movieScheema)
export default moviesModal
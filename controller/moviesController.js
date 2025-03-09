import moviesModal from "../model/moviemodal.js"
import ApiFeature from "../utility/feature.js"
import jwt from "jsonwebtoken"
import util from "util"
import dotenv from "dotenv";

dotenv.config();



const highestRated = (req, res, next) => {
  req.query.limit = "4"
  req.query.sort = "rating"
  next()
}

const protectRoute = async (req, res, next) => {
  try {
    // 1 read the token and check if its exist 
    let token = req.headers.authorization
    if (token && token.startsWith("bearer ")) {
      token = token.split(" ")[1];
    }
    console.log("token", token);

    // 2 validate the token
    const valid = jwt.verify(token, process.env.token_Str)
    console.log(valid);

    // 3 if the user exist

    // 4 allow user to access routes
    next()
  } catch (err) {
    console.error("JWT Verification Error:", err.message);
    res.status(402).json({
      message: "failed",
      error: err.message
    })

  }


}


const getMovies = async (req, res) => {

  try {
    const features = new ApiFeature(moviesModal.find(), req.query)
      .filter()
      .sort()
      .field()
      .page()


    const movies = await features.query


    res.status(200).json({
      status: "success",
      length: movies.length,
      data: movies,
    })
  } catch (err) {
    res.status(500).json({ message: "Error fetching movies", Error: err.message })
  }
}

const getMoviesStates = async (req, res) => {
  try {
    const moviesStates = await moviesModal.aggregate([
      { $match: { rating: { $gte: 7 } } },
      {
        $group: {
          "_id": "$releaseYear",
          avgRating: { $avg: "$rating" },
          avgprice: { $avg: "$price" },
          avgtotalRating: { $avg: "$totalRating" },
          moviesCount: { $sum: 1 },
          sumPrice: { $sum: "$price" }
        }

      },
      { $sort: { avgRating: 1 } }
    ])
    res.status(200).json({
      status: "success",
      length: moviesStates.length,
      data: moviesStates,
    })
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
}

const getMoviesGenre = async (req, res) => {
  try {
    const genereParams = req.params.genere
    const movies = await moviesModal.aggregate([
      { $unwind: "$genres" },
      {
        $group: {
          "_id": "$genres",
          movieCount: { $sum: 1 },
          movies: { $push: "$name" }
        }

      },
      { $addFields: { genres: "$_id" } },
      { $project: { _id: 0 } },
      { $sort: { movieCount: -1 } },
      { $match: { genres: genereParams } }

    ])
    res.status(200).json({
      status: "success",
      length: movies.length,
      data: movies,
    })
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
}

const postMovies = async (req, res) => {
  try {
    const newMovie = await moviesModal.create(req.body)
    res.status(201).json({
      status: "success",
      data: newMovie
    })
  } catch (err) {
    res.status(500).json({
      message: "Error creating movie",
      msg: err.message
    })
  }

}

const getSpecificMovie = async (req, res) => {
  try {
    const data = await moviesModal.findById(req.params.id)
    res.status(200).json({
      movie: data
    })
  } catch {
    res.status(500).json({ message: "Error fetching movie" })
  }


}

const updateMovie = async (req, res) => {
  try {
    const data = await moviesModal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    res.status(200).json({
      status: "movie is update",
      data: data
    })
  } catch {
    res.status(500).json({ message: "Error updating movie" })
  }
}

const deleteMovie = async (req, res) => {
  try {
    const data = await moviesModal.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: "Movie deleted" })
  } catch {
    res.status(500).json({ message: "Error deleting movie" })
  }
}

export {
  getMovies,
  postMovies,
  getSpecificMovie,
  updateMovie,
  deleteMovie,
  highestRated,
  getMoviesStates,
  getMoviesGenre,
  protectRoute
}
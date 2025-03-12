import moviesModal from "../model/moviemodal.js"
import ApiFeature from "../utility/feature.js"
import jwt from "jsonwebtoken"
import userModal from "../model/usermodal.js"


const highestRated = (req, res, next) => {
  req.query.limit = "4"
  req.query.sort = "rating"
  next()
}

const protectedRoute = async (req, res, next) => {
  try {

    // 1. firs check the user has token or not 
    let token = req.headers.authorization
    token = token.split(" ")[1]

    // 2. verfity the token 
    const isVerify = jwt.verify(token, process.env.token_Str)
    if (isVerify) {
      console.log(isVerify);
      // console.log("expire time", new Date(isVerify.exp * 1000).toLocaleString());
    }

    // 3 check the user exist ur not 
    const user = await userModal.findOne({ _id: isVerify.id })

    if (!user) {
      res.status(401).json({
        message: "User not Exist"
      })
    }

    // 4. check if the password change or not 
    const changetime = await user.passwordChangeCheck(isVerify.iat)
    if (changetime) {
      res.status(402).json({
        message: "password has change you should login again"
      })
    }

    // 5. protected Route
    req.user = user

    next()
  } catch (err) {
    res.status(401).json({
      message: err.message === "jwt expired" && "token is expaire"
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
  protectedRoute,
}
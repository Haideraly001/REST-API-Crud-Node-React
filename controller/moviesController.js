import moviesModal from "../model/moviemodal.js"
import ApiFeature from "../utility/feature.js"



const highestRated = (req, res, next) => {
  req.query.limit = "4"
  req.query.sort = "rating"
  next()
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
  getMoviesStates
}
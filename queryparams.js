//  this is query params all logic written by me 6 Feb 2025
import moviesModal from "../model/moviemodal.js"



const highestRated = (req, res, next) => {
  req.query.limit = "4"
  req.query.sort = "rating"
  next()
}



const getMovies = async (req, res) => {


  try {

    // console.log(req.query);

    // step 1
    // const movies = await moviesModal.find()
    //   .where("duration")
    //   .equals(req.query.duration * 1)
    //   .where("rating")
    //   .equals(req.query.rating * 1)

    // step 2
    // const movies = await moviesModal.find({ rating: req.query.rating * 1 }) also can call two

    // step 3
    // const movies = await moviesModal.find(req.query)

    // step4
    // const exclusiveFeild = ["sort", "page", "feild", "limit"]
    // const query = { ...req.query }
    // exclusiveFeild.forEach((el) => {
    //   delete query[el]
    // })

    // console.log(query);

    // const movies = await moviesModal.find(query)

    // step5 for gte|lte|gt|lt
    // console.log(req.query);

    let querysort = JSON.stringify(req.query)
    querysort = querysort.replace(/(gte|lte|gt|lt)/g, (match) => `$${match}`);

    const getQuery = JSON.parse(querysort)
    // const movies = await moviesModal.find(getQuery)

    // ------------------- sort
    console.log(getQuery);

    let query = moviesModal.find()

    if (req.query.sort) {
      const multiputeQuery = req.query.sort.split(",").join(" ");
      query = query.sort(multiputeQuery)
    } else {
      query = query.sort("createdAt")
    }

    if (req.query.feild) {
      const multipuleFeild = req.query.feild.split(",").join(" ")
      query = query.select(multipuleFeild)
    } else {
      query = query.select("-__v")
    }

    const page = +req.query.page
    const limit = +req.query.limit
    const skip = (page - 1) * limit
    query.skip(skip).limit(limit)


    const movies = await moviesModal.find(query)

    res.status(200).json({
      status: "success",
      length: movies.length,
      data: movies,
    })
  } catch (err) {
    res.status(500).json({ message: "Error fetching movies", Error: err.message })
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
  highestRated
}
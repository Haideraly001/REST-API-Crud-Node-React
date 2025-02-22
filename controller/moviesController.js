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

    // let query = { ...req.query }

    // let sortQuery = JSON.stringify(query)
    // sortQuery = sortQuery.replace(/(gt|gte|lt|lte)/g, (match) => `$${match}`)
    // sortQuery = JSON.parse(sortQuery)


    // const { sort, field, limit, page, ...filters } = sortQuery

    // let filterQuery = moviesModal.find(filters)
    // console.log(sortQuery);

    // if (req.query.sort) {
    //   const merge = req.query.sort.split(",").join(" ")
    //   filterQuery = filterQuery.sort(merge)
    // }

    // if (req.query.field) {
    //   const merge = req.query.field.split(",").join(" ")
    //   filterQuery = filterQuery.select(merge)
    // }


    // const pageNum = req.query.page * 1
    // const limitNum = req.query.limit * 1

    // const skip = (pageNum - 1) * limitNum;
    // filterQuery.skip(skip).limit(limitNum)

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
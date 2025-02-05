import moviesModal from "../model/moviemodal.js"


const getMovies = async (req, res) => {
  try {
    // console.log(req.query);

    // const movies = await moviesModal.find()
    //   .where("duration")
    //   .equals(req.query.duration)
    //   .where("releaseYear")
    //   .equals(req.query.releaseYear)

    // const movies = await moviesModal.find({ duration: +req.query.duration, releaseYear: +req.query.releaseYear })

    // ---------------------
    // const obj = JSON.stringify(req.query.name)

    // const splitName = obj.replace(/"/g, '').split(/(?=[A-Z])/);
    // const nowsplitjoin = splitName.join(" ")

    // console.log(nowsplitjoin);

    // const movies = await moviesModal.find({ name: nowsplitjoin })

    // ---------------------------

    // let exclusiveArray = { ...req.query }

    // exclusiveArray = Object.keys(exclusiveArray)


    // const exclusiveArray = ['sort', 'page', 'limit']
    // console.log(req.query);


    // let query = { ...req.query }

    // exclusiveArray.forEach((el) => {
    //   delete query[el]
    // })
    // ---------------------

    let queryObj = JSON.stringify(req.query)
    queryObj = queryObj.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`)

    const queryData = JSON.parse(queryObj)

    // -------------

    console.log(req.query);
    let querySort = moviesModal.find({})

    if (req.query.sort) {
      const splitmanySort = req.query.sort.split(",").join(" ")
      console.log(splitmanySort);

      querySort = querySort.sort(splitmanySort) // req.query.sort replace by price
    }


    const movies = await querySort
    res.status(200).json({
      status: "success",
      length: movies.length,
      data: movies,
    })
  } catch {
    res.status(500).json({ message: "Error fetching movies" })
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
  deleteMovie
}
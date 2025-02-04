import moviesModal from "../model/moviemodal.js"


const getMovies = async (req, res) => {
  try {

    console.log(req.query);

    // step1
    // when we don't specify any query string then its show us nothing 
    // const movies = await moviesModal.find()
    //   .where("duration")
    //   .equals(req.query.duration)
    //   .where("rating")
    //   .equals(req.query.rating)

    // step2
    // when we don't specify any query string its show us all data and when we add query feild which one is exist its will work on both but when we add more field which one is not exist it will through error 
    // const movies = await moviesModal.find(req.query)

    // step3
    // in this  when we add any more specific feild and its has duration and sort in array but we mention page in it, it will automatically remove page 
    // const excludeFeild = ['limit', 'feild', 'sort', 'page']

    // const query = { ...req.query }

    // excludeFeild.forEach((el) => {
    //   delete query[el]
    // })

    // console.log(query);


    // step4
    // for if we add gte ur lte field in query
    let queryStr = JSON.stringify(req.query)
    console.log(queryStr);

    queryStr = queryStr.replace(/\b(gte|lte|gt|lt)\b/g, (match) => `$${match}`)
    const queryObj = JSON.parse(queryStr)


    console.log('queryobj', queryObj);


    const movies = await moviesModal.find(queryObj)




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
  } catch {
    res.status(500).json({
      message: "Error creating movie"
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
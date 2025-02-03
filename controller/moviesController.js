import moviesModal from "../model/moviemodal.js"


const getMovies = async (req, res) => {
  try {
    const movies = await moviesModal.find({})
    res.status(200).json({
      status: "success",
      data: movies,
    })
  } catch {
    res.status(500).json({ message: "Error fetching movies" })
  }
}

const postMovies = async (req, res) => {
  try {

    console.log(req.body);

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

export {
  getMovies,
  postMovies
}
import express from "express"
import fs from "fs"


const app = express()
const port = 3000;

app.use(express.json())

const movies = JSON.parse(fs.readFileSync("./movies.json"))

const getMethod = (req, res) => {
  res.status(200).json({
    status: true,
    data: movies
  })
}

const postMethod = (req, res) => {
  const body = req.body

  const Idx = movies[movies.length - 1].id + 1

  const addMovie = { ...body, id: Idx }
  console.log("addMovie", addMovie);

  movies.push(addMovie)

  const newMoviesData = fs.writeFile("./movies.json", JSON.stringify(movies), (err) => {
    if (!addMovie) {
      console.log(err)
    }
  })

  res.status(200).json({
    status: true,
    data: addMovie
  })
}

const getMethodByIdx = (req, res) => {
  const id = req.params.id * 1

  const movieByIdx = movies.find((el) => el.id === id)

  res.status(200).json({
    status: true,
    movies: movieByIdx
  })
}

const patchMethod = (req, res) => {
  const id = req.params.id * 1
  const body = req.body

  const findMovie = movies.find((el) => el.id === id)

  console.log(body, findMovie);

  const updateMovie = { ...findMovie, ...body }
  console.log("updateMovie", updateMovie);

  const fitMovie = movies.indexOf(findMovie)
  movies[fitMovie] = updateMovie

  fs.writeFile('./movies.json', JSON.stringify(movies), (err) => {
    if (err) {
      return res.status(404).json({
        err: "Error",
        message: "Movie not Edit"
      }
      )
    }
  })

  res.status(200).json({
    status: true,
    data: updateMovie
  })

}

const deleteMethod = (req, res) => {
  const id = req.params.id * 1
  const findMovie = movies.find((el) => el.id === id)
  const fitMovie = movies.indexOf(findMovie)
  movies.splice(fitMovie, 1)
  fs.writeFile('./movies.json', JSON.stringify(movies), (err) => {
    if (err) {
      return res.status(404).json({
        err: "Error",
        message: "Movie not Delete"
      })
    }
  })
  res.status(200).json({
    status: true,
    data: "Movie Deleted"
  })
}


// app.get("/movies", getMethod)

// app.post("/movies", postMethod)

// app.get('/movies/:id', getMethodByIdx)

// app.patch('/movies/:id', patchMethod)

// app.delete("/movies/:id", deleteMethod)


app.use()

app.route("/movies")
  .get(getMethod)
  .post(postMethod)

app.route("/movies/:id")
  .get(getMethodByIdx)
  .patch(patchMethod)
  .delete(deleteMethod)



app.listen(port, () => {
  console.log("Server is running on port 3000")
})
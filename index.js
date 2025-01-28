import express from "express"
import fs from "fs"


const app = express()
const port = 3000;

app.use(express.json())

const movies = JSON.parse(fs.readFileSync("./movies.json"))


app.get("/movies", (req, res) => {
  res.status(200).json({
    status: true,
    data: movies
  })
})

app.post("/movies", (req, res) => {
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
})

app.get('/movies/:id', (req, res) => {
  const id = req.params.id * 1

  const movieByIdx = movies.find((el) => el.id === id)

  res.status(200).json({
    status: true,
    movies: movieByIdx
  })
})

app.patch('/movies/:id', (req, res) => {
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

})

app.delete("/movies/:id", (req, res) => {
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

})


app.listen(port, () => {
  console.log("Server is running on port 3000")
})
import express from "express"
import fs from "fs"

const app = express()

const port = 3000
app.use(express.json())

const movies = JSON.parse(fs.readFileSync("./movies.json"))

app.get("/movies", (req, res) => {
  res.status(200).json({ movies: movies })
})

app.post("/movies", (req, res) => {
  const newMovie = req.body
  const id = movies[movies.length - 1].id + 1
  const addMovie = { ...newMovie, id: id }
  console.log(addMovie);

  movies.push(addMovie)
  fs.writeFile("./movies.json", JSON.stringify(movies), (err) => {
    if (err) console.log(err)
  })
  res.status(200).json({
    status: 200,
    newMovie
  })
})

app.get("/movies/:id?", (req, res) => {
  const Id = req.params.id * 1

  const moviesById = movies.find((el) => el.id === Id)
  if (!moviesById) {
    res.status(400)
  }
  res.status(200).json({
    movie: moviesById
  })
})

app.patch("/movies/:id", (req, res) => {
  const id = req.params.id * 1
  const editMovie = movies.find((el) => el.id === id)
  const updateMovie = { ...editMovie, ...req.body }

  const movieIndex = movies.indexOf(editMovie)
  console.log("movieIndex", movieIndex);

  movies[movieIndex] = updateMovie

  fs.writeFile('./movies.json', JSON.stringify(movies), (err) => {
    if (err) {
      res.status(404).json({
        status: 404,
        message: "Movie not found"
      })
    }
  })

  res.status(200).json({
    status: 200,
    movie: updateMovie
  })






})



app.listen(port, () => {
  console.log(`server is listed at ${port}`);

})
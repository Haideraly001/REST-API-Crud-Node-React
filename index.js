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
  const addMovie = ({ ...newMovie, id: id })
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

app.listen(port, () => {
  console.log(`server is listed at ${port}`);

})
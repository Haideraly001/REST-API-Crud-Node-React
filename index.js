import express from 'express'
import fs from 'fs'

const app = express()
const port = 3000;

app.use(express.json())

const movies = JSON.parse(fs.readFileSync('./movies.json'))


app.get('/movies', (req, res) => {
  res.status(200).json({
    movies: movies
  })
})

app.post('/movies', (req, res) => {
  const newMovies = req.body
  const newId = movies[movies.length - 1].id + 1

  const movieAdd = { id: newId, ...newMovies }
  movies.push(movieAdd)

  fs.writeFile("./movies.json", JSON.stringify(movies), (err, data) => {
    if (err) {
      console.log(err);
    }
  })

  res.status(200).json({
    data: movies
  })
})

app.get('/movies/:id', (req, res) => {
  const id = req.params.id * 1
  console.log(id);

  const findMovie = movies.find((el) => el.id === id)
  console.log('moives', findMovie);

  if (!findMovie) {
    res.status(404).json({
      message: 'Movie not found'
    })
  }

  res.status(200).json({
    movie: findMovie
  })

})



app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
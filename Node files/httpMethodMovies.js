import express from 'express'
import fs from 'fs'

const app = express()
const port = 3000

const movies = JSON.parse(fs.readFileSync('./movies.json'))
app.use(express.json())


const getRequest = (req, res) => {
  res.status(200).json({
    status: "success",
    data: movies
  })
}

const postRequest = (req, res) => {
  const newMovie = req.body
  const Id = movies[movies.length - 1].id + 1
  const modifyObj = { ...newMovie, id: Id }

  movies.push(modifyObj)

  fs.writeFile('./movies.json', JSON.stringify(movies), (err) => {
    if (err) {
      console.error(err)
    }
  })
  res.status(201).json({
    status: "success",
    data: modifyObj
  })
}

const getRequestById = (req, res) => {
  const params = req.params.id * 1
  const findMovie = movies.find((el) => el.id === params)
  res.status(200).json({
    status: "success",
    data: findMovie
  })
}

const patchRequestById = (req, res) => {
  const params = req.params.id * 1

  if (movies.length < params) {
    res.status(404).json({
      status: "error",
      message: "Movie not found"
    })
  }

  const findMovie = movies.find((el) => el.id === params)
  // console.log(findMovie);
  // console.log(req.body);

  const EditMovie = { ...findMovie, ...req.body }
  // const editMovie = Object.assign(findMovie, req.body)
  // console.log(EditMovie);

  const indexOf = movies.indexOf(findMovie)
  movies[indexOf] = EditMovie

  fs.writeFile('./movies.json', JSON.stringify(movies), (err) => {
    if (err) {
      return res.status(404).json(
        err = "Error",
        message = "Movie not Edit"
      )
    }
  })
  res.status(200).json({
    status: "success",
    data: EditMovie
  })
}

const deleteRequestById = (req, res) => {
  const params = req.params * 1
  const findMovie = movies.find((el) => el.id === params)
  const indexOf = movies.indexOf(findMovie)
  movies.splice(indexOf, 1)

  res.status(200).json({
    status: "success find is deleted",
    data: {}
  })
}


// app.get('/movies', getRequest)

// app.post('/movies', postRequest)

// app.get("/movies/:id", getRequestById)

// app.patch("/movies/:id", patchRequestById)

// app.delete('/movies/:id', deleteRequestById)

const logger = (req, res, next) => {
  console.log("middleware call");
  next()
}

app.route('/movies').get(getRequest).post(postRequest)

app.use(logger)

app.route('/movies/:id').patch(patchRequestById).get(getRequestById).delete(deleteRequestById)

app.listen(port, () => {
  console.log(`server is listen at ${port}`);
})

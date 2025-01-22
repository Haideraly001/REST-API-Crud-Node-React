import express from 'express'
import fs from 'fs'

const app = express()
const port = 3000

const movies = JSON.parse(fs.readFileSync('./movies.json'))

app.use(express.json())

app.use((req, res, next) => {
  req.data = new Date().toISOString()
  next()
})






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
  console.log("req.requestAt", req.requestAt);

  res.status(201).json({
    status: "success",
    Date: req.data,
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


const logger = (req, res, next) => {
  console.log("middleware id call");
  next()
}

const moviesRouter = express.Router()

app.use("/movies", moviesRouter)

moviesRouter.route('/')
  .get(getRequest)
  .post(postRequest)

app.use(logger)

moviesRouter.route('/:id')
  .patch(patchRequestById)
  .get(getRequestById)
  .delete(deleteRequestById)

app.listen(port, () => {
  console.log(`server is listen at ${port}`);
})

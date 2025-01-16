import express from "express"
import fs from "fs"

const app = express()
const port = 3000;

app.use(express.json())

const movies = JSON.parse(fs.readFileSync("./user.json"))


app.get("/app/v1/movies", (req, res) => {
  res.status(200).json({
    status: "200", data: {
      "movies": movies
    }
  })
})


app.post("/app/v1/movies", (req, res) => {
  const newId = movies[movies.length - 1].id + 1
  const users = req.body
  const newObj = ({ id: newId, ...users })
  console.log("newObj", newObj);
  movies.push(newObj)
  fs.writeFile("./user.json", JSON.stringify(movies), (err) => {
    if (err) {
      console.error(err)
    }
  })

  res.status(200).json({
    status: "200",
    data: {
      "movies": newObj
    }
  })
})

app.get("/app/v1/movies/:id/:name?", (req, res) => {
  const params = req.params.id * 1
  const uniqueMovie = movies.find((el) => el.id === params)
  if (!uniqueMovie) {
    res.status(404).json({
      status: 404,
      message: "Movie not found"
    })
  }

  res.status(200).json({
    data: uniqueMovie
  })
})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
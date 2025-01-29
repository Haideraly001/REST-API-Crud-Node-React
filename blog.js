import express from 'express'

const app = express()

const blogRoute = express.Router()


blogRoute.get('/', (req, res) => {
  res.send("Blog Home")
})

blogRoute.get("/:id", (req, res) => {
  res.send("Blog Post")
})

export default blogRoute
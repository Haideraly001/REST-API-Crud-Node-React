import express from "express"
import blogRouter from './controller/blog.js'

const app = express()
const port = process.env.PORT || 3000


app.get('/', (req, res) => {
  res.send('send a server')
})

app.use('/blog', blogRouter)


app.listen(port, () => {
  console.log(`Exampl e app listening on port ${port}`)
})
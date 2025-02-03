import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import movieRouter from "./router/moviesroute.js"

dotenv.config()
const port = process.env.PORT
const dbConnect = process.env.DB_CON

const app = express()
app.use(express())

if (!dbConnect) {
  console.log("db is not working");
  process.exit(1)
}

mongoose.connect(dbConnect, {
  useNewUrlParser: true,
})
  .then((conn) => {
    console.log("Connected to MongoDB")
  }).catch(() => {
    console.log("Error connecting to MongoDB")
  })


app.use("/api/movies", movieRouter)

app.listen(port)

import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import { fileURLToPath } from 'url';
import path from "path"
import movieRouter from "./router/moviesroute.js"
import authUser from './router/userRouter.js'
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



dotenv.config()
const port = process.env.PORT
const dbConnect = process.env.DB_CON

const app = express()

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
// app.use(cors());


app.use(express())

if (!dbConnect) {
  console.log("db is not working");
  process.exit(1)
}

mongoose.connect(dbConnect)

app.use(express.static(path.join((__dirname, "./app/client/build"))))

app.use("/api/movies", movieRouter)
app.use('/api/user', authUser)

app.listen(port)

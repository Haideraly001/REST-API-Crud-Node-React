import express from "express"
import { getMovies, postMovies } from "../controller/moviesController.js"

const router = express.Router()

router.use(express.json())

router.get("/", getMovies)
router.post("/", postMovies)

export default router
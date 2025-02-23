import express from "express"
import { getMovies, postMovies, updateMovie, deleteMovie, getMoviesGenre, getMoviesStates, highestRated, getSpecificMovie } from "../controller/moviesController.js"

const router = express.Router()

router.use(express.json())

router.get("/higest-rated", highestRated, getMovies)

router.get("/getmovies-state", getMoviesStates)
router.get("/getmovies-genre/:genere", getMoviesGenre)
router.get("/", getMovies)
router.post("/", postMovies)

router.get("/:id", getSpecificMovie)
router.patch("/:id", updateMovie)
router.delete("/:id", deleteMovie)


export default router
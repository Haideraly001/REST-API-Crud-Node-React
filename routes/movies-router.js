import express from "express"
import { getAllMovies, createMovie, findById, uploadFile, updateMovie, topFivehighestRating } from "../controller/movies-controller.js"
import multer from 'multer'

const route = express.Router()

route.use(express.json())


// Define storage settings for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/imgs");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1]);
  }
});


const upload = multer({ storage: storage });


route.get("/", getAllMovies)
route.post("/", createMovie)
route.post("/upload", upload.single("file"), uploadFile)
route.get("/top-five", topFivehighestRating, getAllMovies)
route.get("/:id", findById)
route.patch("/:id", updateMovie)


export default route
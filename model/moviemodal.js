import mongoose from "mongoose"
import fs from "fs"

const movieScheema = new mongoose.Schema({

  name: {
    type: String,
    required: [true, "Name feild is required"],
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    required: [true, "description feild is required"],
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, "Duration feild is required"],
  },
  rating: {
    type: Number,
  },
  totalRating: {
    type: Number,
  },
  releaseYear: {
    type: Number,
    required: [true, "Release Year feild is required"]
  },
  releaseDate: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  genres: {
    type: [String],
    required: [true, "genres feild is required"]
  },
  directors: {
    type: [String],
    required: [true, "Director feild is required"]
  },
  coverImage: {
    type: String,
    required: [true, "Cover Image feild is required"]
  },
  actor: {
    type: [String],
    requried: [true, "actor feild is required"]
  },
  price: {
    type: String,
    requried: [true, "price feild is required"]
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

movieScheema.virtual("durationinHr").get(function () {
  return this.duration / 60
})

// movieScheema.pre(/^find/, function (next) {
//   this.find({ rating: { $gte: 9 } })
//   this.startTime = Date.now()
//   console.log("Haider1", this.startTime);

//   next()
// })

// movieScheema.post(/^find/, function (doc, next) {
//   this.find({ rating: { $gte: 9 } })
//   this.endtime = Date.now()
//   console.log("Haider2");


//   const text = `The time ${this.endtime - this.startTime} starting to end to fetch the doc`
//   try {
//     fs.writeFile("./data.txt\n", text, (err) => {
//       if (err) {
//         console.log(err.message);
//       }
//     });
//     console.log("Time logged to data.txt successfully.", this.endtime);
//   } catch (err) {
//     console.error("Error writing to file:", err.message);
//   }
//   next()
// })



const moviesModal = mongoose.model("firstMovies", movieScheema)
export default moviesModal
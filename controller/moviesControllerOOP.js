import moviesModal from "../model/moviemodal.js"



const highestRated = (req, res, next) => {
  req.query.limit = "4"
  req.query.sort = "rating"
  next()
}



const getMovies = async (req, res) => {


  try {

    let querysort = JSON.stringify(req.query)
    querysort = querysort.replace(/(gte|lte|gt|lt)/g, (match) => `$${match}`);

    const getQuery = JSON.parse(querysort)
    // const movies = await moviesModal.find(getQuery)

    // ------------------- sort logic
    console.log(getQuery);

    // let query = moviesModal.find(getQuery)


    const { sort, field, page, limit, ...filters } = getQuery;

    console.log("🚀 Parsed Query (Filters):", filters);

    let query = moviesModal.find(filters);

    const moviesBeforeSort = await moviesModal.find(filters)
    console.log("📌 Movies Found Before Sorting:", moviesBeforeSort.length);

    if (req.query.sort) {
      const multiputeQuery = req.query.sort.split(",").join(" ");
      query = query.sort(multiputeQuery)
    } else {
      query = query.sort("createdAt")
    }

    if (req.query.field) {
      const multipuleField = req.query.field.split(",").join(" ")
      query = query.select(multipuleField)
    } else {
      query = query.select("-__v")
    }

    let pageNum = +req.query.page
    let limitNum = +req.query.limit
    const skip = (pageNum - 1) * limitNum
    query.skip(skip).limit(limitNum)


    const movies = await query;


    res.status(200).json({
      status: "success",
      length: movies.length,
      data: movies,
    })
  } catch (err) {
    res.status(500).json({ message: "Error fetching movies", Error: err.message })
  }
}

// const getMovies = async (req, res) => {
//   try {
//     // Convert query parameters to a string and replace operators for MongoDB
//     let querysort = JSON.stringify(req.query);
//     querysort = querysort.replace(/(gte|lte|gt|lt)/g, (match) => `$${match}`);

//     // Parse back into object
//     let getQuery = JSON.parse(querysort);

//     // ❌ Remove `sort` and `field` from `getQuery` because they are NOT filters
//     const { sort, field, page, limit, ...filters } = getQuery;

//     console.log("🚀 Parsed Query (Filters):", filters);

//     let query = moviesModal.find(filters);

//     // ✅ Debug: Check if filtering removes all movies
//     const moviesBeforeSort = await moviesModal.find(filters);
//     console.log("📌 Movies Found Before Sorting:", moviesBeforeSort.length);

//     // ✅ Sorting
//     if (sort) {
//       console.log("📌 Sorting By:", sort);
//       const sortFields = sort.split(",").join(" ");
//       query = query.sort(sortFields);
//     } else {
//       query = query.sort("createdAt");
//     }

//     // ✅ Selecting Fields
//     if (field) {
//       const fields = field.split(",").join(" ");
//       query = query.select(fields);
//     } else {
//       query = query.select("-__v");
//     }

//     // ✅ Pagination
//     const pageNum = +page || 1;
//     const limitNum = +limit || 10;
//     const skip = (pageNum - 1) * limitNum;
//     query = query.skip(skip).limit(limitNum);

//     console.log("📌 Final MongoDB Query:", query.getFilter());

//     // ✅ Execute Query
//     const movies = await query;

//     console.log("✅ Movies Retrieved:", movies.length);

//     res.status(200).json({
//       status: "success",
//       length: movies.length,
//       data: movies,
//     });
//   } catch (err) {
//     console.error("❌ Error fetching movies:", err.message);
//     res.status(500).json({ message: "Error fetching movies", error: err.message });
//   }
// };


const postMovies = async (req, res) => {
  try {
    const newMovie = await moviesModal.create(req.body)
    res.status(201).json({
      status: "success",
      data: newMovie
    })
  } catch (err) {
    res.status(500).json({
      message: "Error creating movie",
      msg: err.message
    })
  }

}

const getSpecificMovie = async (req, res) => {
  try {
    const data = await moviesModal.findById(req.params.id)
    res.status(200).json({
      movie: data
    })
  } catch {
    res.status(500).json({ message: "Error fetching movie" })
  }


}

const updateMovie = async (req, res) => {
  try {
    const data = await moviesModal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    res.status(200).json({
      status: "movie is update",
      data: data
    })
  } catch {
    res.status(500).json({ message: "Error updating movie" })
  }
}

const deleteMovie = async (req, res) => {
  try {
    const data = await moviesModal.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: "Movie deleted" })
  } catch {
    res.status(500).json({ message: "Error deleting movie" })
  }
}

export {
  getMovies,
  postMovies,
  getSpecificMovie,
  updateMovie,
  deleteMovie,
  highestRated
}
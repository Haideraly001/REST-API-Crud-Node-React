import moviesModal from '../model/movies-modal.js'




const topFivehighestRating = (req, res, next) => {
  req.query.limit = "5",
    req.query.sort = "-rating",
    next()
}

const getAllMovies = async (req, res) => {
  try {
    let queryData = { ...req.query }
    console.log(queryData);
    // const allMovies = await moviesModal.find({ price: { "$gte": +req.query.price } })
    // const allMovies = await moviesModal.find({ price: +req.query.price  })

    // const allMovies = await moviesModal.find().where("price").equals(+req.query.price)


    // const exclusiveQuery = ["sort", "field", "page", "select"]

    // exclusiveQuery.forEach((el) => {
    //   delete queryData[el]
    // })

    // console.log("after sort", queryData);


    let queryStr = JSON.stringify(req.query)
    queryStr = queryStr.replace(/(gte|gt|lte|lt)/g, (match) => `$${match}`)
    queryStr = JSON.parse(queryStr)

    console.log("queryStr", queryStr);


    const { sort, field, page, limit, ...filters } = queryStr

    let queryFields = moviesModal.find(filters)

    if (req.query.sort) {
      queryFields = queryFields.sort(req.query.sort)
    } else {
      queryFields = queryFields.sort('createdAt')
    }

    if (req.query.field) {
      const multiputle = req.query.field.split(",").join(" ")
      console.log(multiputle);
      queryFields = queryFields.select(multiputle)
    } else {
      queryFields = queryFields.select("-__v")
    }

    const pageNum = +req.query.page || 1;
    const limitNum = Number(req.query.limit) || 10;
    const skip = (pageNum - 1) * limitNum

    queryFields = queryFields.skip(skip).limit(limit)


    const allMovies = await queryFields


    res.status(201).json({
      status: "success",
      length: allMovies.length,
      movies: allMovies
    })
  } catch (err) {
    res.status(401).json({
      status: "fail",
      err: err.message
    })
  }
}

const createMovie = async (req, res) => {
  try {
    const create = await moviesModal.create(req.body)
    res.status(201).json({
      status: "success",
      data: create
    })
  } catch (err) {
    res.status(401).json({
      status: "fail",
      err: err.message
    })
  }
}

const findById = async (req, res) => {
  const body = req.params.id
  try {
    const find = await moviesModal.findById(body)
    res.status(201).json({
      status: "success",
      data: find
    })
  } catch (err) {
    res.status(401).json({
      status: "fail",
      err: err.message
    })
  }
}

const updateMovie = async (req, res) => {
  const id = req.params.id
  try {
    const update = await moviesModal.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    res.status(201).json({
      status: "success",
      data: update
    })
  } catch (err) {
    res.status(401).json({
      status: "fail",
      err: err.message
    })
  }
}

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    console.log("File Uploaded:", req.file);

    res.json({
      message: "File uploaded successfully!",
      file: req.file
    });
  } catch (error) {
    res.status(500).json({ message: "File upload failed", error: error.message });
  }
};

export {
  getAllMovies, createMovie, findById, updateMovie, topFivehighestRating, uploadFile
}
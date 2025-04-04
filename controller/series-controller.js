import seriesModal from "../model/series-modal.js"

const aliasMiddleware = (req, res, next) => {
  req.query.sort = "price"
  req.query.limit = 4
  next()
}

const getAllSeries = async (req, res) => {

  let query = { ...req.query }
  try {
    // 1st 
    // const allseries = await seriesModal.find()

    // 2nd
    // const allseries = await seriesModal.find()
    //   .where("rating")
    //   .equals(8.7)

    // 3rd 
    // const allseries = await seriesModal.find({ rating: 9.2, price: 9 })

    // 4th 
    // const allseries = await seriesModal.find(query)

    // 5th 
    const exclusiveData = ["field", "sort", "page", "limit"]

    exclusiveData.forEach((el) => {
      delete query[el]
    })

    // 6th
    // const allseries = await seriesModal.find({ rating: { $gte: req.query.rating } })

    // 7th

    query = JSON.stringify(query)
    query = query.replace(/(gte|gt|lte|lt)/g, (match) => `$${match}`)
    query = JSON.parse(query)


    const { sort, field, limit, page, ...filters } = query
    // const allseries = await seriesModal.find(filters)
    let queries = seriesModal.find(filters)
    if (req.query.sort) {
      const multipule = req.query.sort.split(",").join(" ")
      queries = queries.sort(multipule)
    } else {
      queries = queries.sort("-createdAt")
    }

    if (req.query.field) {
      const multipule = req.query.field.split(",").join(" ")
      queries = queries.select(multipule)
    } else {
      const multipulechange = ["-__v", "-id"].join(" ")
      queries = queries.select(multipulechange)
    }

    const pageNum = req.query.page || 1
    const limitNum = req.query.limit || 10

    const skip = (pageNum - 1) * limitNum

    queries = queries.skip(skip).limit(limitNum)
    const allseries = await queries



    // if (allseries.length === 0) {
    //   res.status(401).json({
    //     status: "fail",
    //     err: "not find the data"
    //   })
    // }

    res.status(200).json({
      status: "success",
      length: allseries.length,
      series: allseries
    })
  }
  catch (err) {
    res.status(401).json({
      status: "fail",
      err: err.message
    })
  }
}

const addSeries = async (req, res) => {
  try {
    const createSeries = await seriesModal.create(req.body)

    res.status(200).json({
      status: "success",
      season: createSeries
    })
  } catch (err) {
    res.status(401).json({
      status: "fail",
      err: err.message
    })
  }

}

const getOneSeries = async (req, res) => {
  console.log(req.params);

  try {
    const getOneSeries = await seriesModal.find({ _id: req.params.id })

    res.status(200).json({
      status: "success",
      season: getOneSeries
    })
  } catch (err) {
    res.status(401).json({
      status: "fail",
      err: err.message
    })
  }

}

const updateSeries = async (req, res) => {
  try {
    const id = req.params.id
    console.log(req.body);

    console.log(id);

    const updatedSeries = await seriesModal.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })

    if (!updatedSeries) {
      return res.status(404).json({
        status: "fail",
        message: "Series not found"
      });
    }

    console.log("akldjfk", updatedSeries);


    res.status(200).json({
      status: "success",
      season: updatedSeries
    })
  } catch (err) {
    res.status(401).json({
      status: "fail",
      err: err.message
    })
  }

}

export {
  getAllSeries,
  addSeries,
  updateSeries,
  getOneSeries,
  aliasMiddleware
}
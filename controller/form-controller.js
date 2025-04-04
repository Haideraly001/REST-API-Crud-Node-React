import model from '../model/form-model.js'

const getAllForms = async (req, res) => {
  const data = await model.find()

  res.status(200).json({
    status: "succss",
    length: data.length,
    data: data
  })
}

const createForm = async (req, res) => {
  try {
    const body = req.body
    const data = await model.create(body)
    res.status(201).json({
      status: "success",
      data: data
    })
  } catch (err) {
    res.status(401).json({
      status: "fail",
      err: err.message
    })
  }
}



export {
  getAllForms,
  createForm,
}
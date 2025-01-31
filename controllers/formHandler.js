import fs from "fs"
import formModel from "../model/formModal.js"
const formDATA = JSON.parse(fs.readFileSync('./form.json', 'utf-8'))




const getData = async (req, res) => {
  try {
    const find = await formModel.find({})
    res.json({
      status: 200,
      message: find,
    })
  } catch {
    res.status(500).send({ message: "Internal Server Error" })
  }
}

const insertform = async (req, res) => {
  try {
    console.log(req.body);

    const newform = await formModel.create(req.body)
    res.json({
      status: 200,
      message: newform
    })

  } catch {
    res.status(500).send({ message: "Internal Server Error" })
  }
}










const getForm = (req, res) => {
  res.status(200).json({
    status: true,
    message: formDATA,
    message: "success"
  })
}

const getFormById = (req, res) => {
  const url = req.params.id * 1

  const formbyid = formDATA.find((el) => el === url)
  console.log(formbyid);

  res.status(200).json({
    status: "success",
    Date: req.Date,
    newdate: req.newDate,
    message: formbyid,
  })
}

export {
  getForm,
  getFormById,
  getData,
  insertform
}
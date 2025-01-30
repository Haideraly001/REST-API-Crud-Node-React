import fs from "fs"
import express from 'express'

const app = express()

app.use(express.json())

const formRouter = express.Router()

const form = JSON.parse(fs.readFileSync('./form.json',))


const getForm = (req, res) => {
  res.status(200).json({
    status: "succss",
    data: form
  })
}

const postForm = (req, res) => {
  const idx = form[form.length - 1].id * 1 + 1

  const newForm = { ...req.body, id: idx }
  form.push(newForm)

  fs.writeFile('./form.json', JSON.stringify(form), (err) => {
    if (!err) {
      res.status(400).json({
        status: "fail"
      })
    }
  })
  res.status(201).json({
    status: "succss",
    data: newForm
  })

}

const getFormbyIdx = (req, res) => {
  const param = req.params.id * 1
  const findData = form.find((el) => el.id === param)

  if (!findData) {
    res.status(400).json({
      status: "fail",
      data: "there is no such id to show "
    })
  }
  res.status(200).json({
    status: "succss",
    data: findData
  })

}

const updateFormByIdx = (req, res) => {

  const urlID = req.params.id * 1
  const findData = form.find((el) => el.id === urlID)
  const updateForm = { ...findData, ...req.body }

  const idxUpdateFrom = form.indexOf(findData)
  form[idxUpdateFrom] = updateForm

  fs.writeFile("./form.json", JSON.stringify(form), (err) => {
    if (!err) {
      res.status(400).json({
        status: "fail",
        data: "file is failed to udpate"
      })
    }
  })
  res.status(200).json({
    status: "succss",
    updateDate: req.date,
    data: updateForm
  })
}

const deleteFormByIdx = (req, res) => {
  const urlID = req.params.id * 1
  const findData = form.find((el) => el.id === urlID)
  const idxDelete = form.indexOf(findData)
  form.splice(idxDelete, 1)

  fs.writeFile("./form.json", JSON.stringify(form), (err) => {
    if (!err) {
      res.status(400).json({
        status: "fail",
      })
    }
  })
  res.status(200).json({
    status: "succss",
    data: "obj delete"
  })
}

app.use((req, res, next) => {
  req.date = new Date().toISOString()
  next()
})

formRouter.route('/')
  .get(getForm)
  .post(postForm)



formRouter.route('/:id')
  .get(getFormbyIdx)
  .patch(updateFormByIdx)
  .delete(deleteFormByIdx)

export default formRouter
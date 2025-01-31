import fs from "fs"
import express from 'express'
import { getForm, postForm, getFormbyIdx, updateFormByIdx, deleteFormByIdx } from "../controller/formController.js"
// import fromController from "../controller/formController"

const app = express()

app.use(express.json())

const formRouter = express.Router()

const form = JSON.parse(fs.readFileSync('./form.json',))



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
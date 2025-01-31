import express from "express"
const formRouter = express.Router()
import { getForm, getFormById, getData, insertform } from "../controllers/formHandler.js";


formRouter.use(express.json())

formRouter.get("/", getData)
formRouter.post("/", insertform)








formRouter.get("/doc", getForm)

formRouter.use((req, res, next) => {
  req.newDate = new Date();
  next()
})

formRouter.get("/doc/:id", getFormById)


export default formRouter
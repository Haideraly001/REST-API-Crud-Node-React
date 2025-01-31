import express from "express"
const formRouter = express.Router()
import { getForm, getFormById } from "../controllers/formHandler.js";


formRouter.get("/", getForm)

formRouter.use((req, res, next) => {
  req.newDate = new Date();
  next()
})

formRouter.get("/:id", getFormById)


export default formRouter
import express from 'express'
import { getAllForms, createForm } from '../controller/form-controller.js'
import { protectedRoute } from '../controller/user-controller.js'


const route = express.Router()

route.use(express.json())


route.get("/", protectedRoute, getAllForms)
route.post("/", createForm)


export default route
import express from "express"
import { signupUser, loginUser, forgetPassword, resetPassword } from "../controller/user-controller.js"

const route = express.Router()

route.use(express.json())

route.post("/signup", signupUser)
route.post("/login", loginUser)
route.post("/forgetPassword", forgetPassword)
route.post("/resetPassword", resetPassword)



export default route
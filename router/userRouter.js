import express from "express"
import { authUser, loginAuth, forgetAuth } from '../controller/authController.js'

const router = express.Router()

router.use(express.json())

router.post('/signup', authUser)
router.post('/login', loginAuth)
router.post('/forgetPassword', forgetAuth)

export default router
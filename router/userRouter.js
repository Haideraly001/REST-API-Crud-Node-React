import express from "express"
import { authUser } from '../controller/authController.js'

const router = express.Router()

router.use(express.json())

router.post('/signup', authUser)

export default router
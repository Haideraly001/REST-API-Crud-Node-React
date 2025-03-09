import express from "express"
import { authUser, loginAuth } from '../controller/authController.js'

const router = express.Router()

router.use(express.json())

router.post('/signup', authUser)
router.post('/login', loginAuth)

export default router
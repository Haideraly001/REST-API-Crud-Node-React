import express from 'express'
import { changePassword, updateMe, protectedRoute } from "../controller/authController.js"

const router = express.Router()

router.use(express.json())


router.patch("/changePassword", protectedRoute, changePassword)
router.patch("/updateMe", protectedRoute, updateMe)

export default router
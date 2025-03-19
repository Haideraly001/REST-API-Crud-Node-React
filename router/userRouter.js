import express from 'express'
import { changePassword, updateMe, protectedRoute } from "../controller/authController.js"

const router = express.Router()

router.use(express.json())


router.post("/changePassword", protectedRoute, changePassword)
router.post("/updateMe", protectedRoute, updateMe)

export default router
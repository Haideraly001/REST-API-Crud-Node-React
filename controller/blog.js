import express from "express"
const router = express.Router()

router.get('/', (req, res) => {
  res.send("Page 1")
})

router.get('/about', (req, res) => {
  res.send("About this Blog")
})
router.get('/myblog', (req, res) => {
  res.send("Blog details")
})

router.get('/blog', (req, res) => {
  res.send("This is my First Blog")
})

export default router;
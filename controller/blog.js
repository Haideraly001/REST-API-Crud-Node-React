import express from "express"
const router = express.Router()
const app = express()

router.use((req, res, next) => {
  // console.log(`Request made to: ${req.path}`);
  next();
});


router.get('/', (req, res) => {
  // console.log("Root route '/' in blogRouter is called");
  res.send("Page 1");
});


router.get('/about', (req, res) => {
  // console.log("Middleware is called for /about");
  res.send("About this Blog")
})
router.get('/myblog', (req, res) => {
  res.send("Blog details")
})

router.get('/blog', (req, res) => {
  res.send("This is my First Blog")
})

export default router;
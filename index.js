import fs from "fs"
import express from 'express'
import blogRoute from "./blog.js"
import mongoose from "mongoose"
import dotenv from "dotenv"
import formRouter from "./router/form.js"

const app = express()

dotenv.config();
const localMongodb = process.env.LOCAL_CONN_STR;

const home = fs.readFileSync("./template/index.html")
app.use(express.static("public"))





if (!localMongodb) {
  console.error("MongoDB connection string is missing in the environment variables.");
  process.exit(1);
}

mongoose.connect(localMongodb).then((conn) => {
  // console.log(conn);
  console.log("Connected to MongoDB")
}).catch((err) => {
  console.log(err);
  process.exit(1)
})


const formSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "feild is require"]
  },
  lastname: {
    type: String,
    required: [true, "feild is require"]
  },
  age: {
    type: String,
    required: [true, "feild is require"]
  },
  email: {
    type: String,
    required: [true, "feild is require"],
    default: 0.1
  },
})

const FormModal = mongoose.model("forms", formSchema)

const testForm = new FormModal({
  fullname: "Haider",
  lastname: "Ali",
  age: "25",
})

testForm.save()
  .then((doc) => {
    console.log(doc)
  }).catch(err => {
    console.log(err)
  })


app.get("/", (req, res) => {
  res.send('<h3>Routes are in /form</h3>')
})
app.use("/form", formRouter)
app.use("/blog", blogRoute)



app.listen(8000)

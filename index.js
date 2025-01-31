import http from "http"
import dotenv from "dotenv"
import express from "express"
import formRouter from "./router/formRouter.js"
import mongoose from "mongoose"
import formModel from "./model/formModal.js"

dotenv.config()
const db = process.env.DB_CON_

if (!db) {
  console.error("MongoDB connection string is missing in the environment variables.");
  process.exit(1);
}

mongoose.connect(db, {
  useNewUrlParser: true,
})
  .then((con) => {
    console.log("db connect");
  }).catch((err) => {
    console.log(err);
  })


const testForm = new formModel({
  fullName: "Jaime",
  lastName: "Lannister",
  email: "jaime@lannister.com"
});

testForm.save()
  .then((doc) => {
    console.log(doc);
  }).catch((err) => {
    console.log(err);
  })


const app = express()

const port = process.env.DEV_PORT

app.use("/api/form", formRouter)

app.listen(port)

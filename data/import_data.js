import fs from "fs"
import dotenv from "dotenv"
import moviesModal from "../model/moviemodal.js"
import mongoose from "mongoose"


dotenv.config()

const db = process.env.DB_CON

const dbConn = async () => {
  try {
    await mongoose.connect(db);
    console.log("Connected to MongoDB");
  } catch {
    console.log("db is not connect");

  }
}
dbConn()


const movies = JSON.parse(fs.readFileSync("./movies.json", 'utf-8'))

const deleteDB = async () => {
  try {
    const data = await moviesModal.deleteMany({});
    console.log(data);

    console.log("delete all data in db")
  } catch {
    console.log("delete data is not success")
  }
}

const exportDB = async () => {
  try {
    await moviesModal.create(movies)
    console.log("export data to db")
  } catch {
    console.log("export data is not success")
  }
}

console.log(process.argv);


if (process.argv[2] === "--import") {
  exportDB()
}
if (process.argv[2] === "--delete") {
  deleteDB()
}




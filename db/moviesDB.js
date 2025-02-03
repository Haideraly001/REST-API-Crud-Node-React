import mongoose from "mongoose";


const mongoConfige = (dbConfiq) => {
  mongoose.connect(dbConfiq, {
    useNewUrlParser: true,
  })
    .then((conn) => {
      console.log("Connected to MongoDB")
    }).catch(() => {
      console.log("Error connecting to MongoDB")
    })

}
export default mongoConfige
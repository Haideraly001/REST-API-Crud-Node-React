import mongoose from "mongoose";


const formSchema = new mongoose.Schema({
  name: {
    type: String,
    requre: [true, "Please Name is require"]
  },
  email: {
    type: String,
    requre: [true, "Please email is require"]
  },
  phone: {
    type: Number,
    requre: [true, "Please phone is require"]
  },
  address: {
    type: String,
    requre: [true, "Please address is require"]
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

const model = mongoose.model("user-form", formSchema)

export default model
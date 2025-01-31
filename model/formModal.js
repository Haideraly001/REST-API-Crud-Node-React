import mongoose from "mongoose";

const formScheema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    default: 1
  }
})

const formModel = mongoose.model("form", formScheema)
export default formModel 
import mongoose from "mongoose"

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

export default FormModal
import mongoose from "mongoose";
import validator from "validator"

const userSchemma = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please Enter an Name"]
  },
  email: {
    type: String,
    require: [true, "please Enter an email"],
    unique: true,
    isLowercase: true,
    validator: [validator.isEmail, "please Enter an valid email"]
  },
  photo: String,
  password: {
    type: String,
    require: [true, "please Enter an password"],
    minlength: 8,
  },
  confirmPassword: {
    type: String,
    require: [true, "please Enter an password"],
    minlength: 8,
  },
})

const userModel = mongoose.model("users", userSchemma)
export default userModel;
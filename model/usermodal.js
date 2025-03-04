import mongoose from "mongoose";
import validator from "validator"
import bcrypt from "bcrypt"

const userSchemma = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter an Name"]
  },
  email: {
    type: String,
    required: [true, "please Enter an email"],
    unique: true,
    isLowercase: true,
    validator: [validator.isEmail, "please Enter an valid email"]
  },
  photo: String,
  password: {
    type: String,
    required: [true, "please Enter an password"],
    minlength: 8,
  },
  confirmPassword: {
    type: String,
    required: [true, "please Enter an confirm password"],
    minlength: 8,
    validate: {
      validator: function (val) {
        return val == this.password
      },
      message: "password & conform password does not match"
    },

  },
})


userSchemma.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  this.password = await bcrypt.hash(this.password, 10);
  this.confirmPassword = undefined;
  next()
})

const userModel = mongoose.model("users", userSchemma)
export default userModel;
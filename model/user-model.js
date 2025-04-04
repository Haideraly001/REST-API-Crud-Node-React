import mongoose from "mongoose";
import validator from "validator"
import bcrypt from "bcrypt"
import crypto from "crypto"

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Name is required"]
  },
  email: {
    type: String,
    require: [true, "email is required"],
    lowercase: true,
    unique: true,
    validate: [validator.isEmail, "email format is required"]
  },
  password: {
    type: String,
    require: [true, "password is required"],
    select: false
  },
  confirmPassword: {
    type: String,
    require: [true, "password is required"],
    select: false,
    validate: {
      validator: function (val) {
        return val === this.password
      },
      message: "conform password is not match"
    }
  },
  resetPasswordToken: String,
  resetPasswordTokenExpair: Date,
})

userSchema.pre("save", async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined
  next()
})

userSchema.methods.passwordMatch = async function (password, userPassword) {
  return await bcrypt.compare(password, userPassword)
}


userSchema.methods.randomToken = async function () {
  return await crypto.randomBytes(64).toString('hex');
}

const userModal = new mongoose.model("user-auth", userSchema)
export default userModal
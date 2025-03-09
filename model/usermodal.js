import mongoose from "mongoose";
import validator from "validator"
import bcrypt from "bcrypt"

const userScheema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please Enter an Name"]
  },
  email: {
    type: String,
    require: [true, "please Enter an Email"],
    unique: true,
    validator: [validator.isEmail, "please Enter an valid Email"],
    isLowercase: true
  },
  password: {
    type: String,
    require: [true, "please Enter an password"],
    minlength: 8,
    select: false
  },
  confirmPassword: {
    type: String,
    require: [true, "please Enter an password"],
    minlength: 8,
    validate: {
      validator: function (val) {
        return val === this.password
      },
      message: "Password and conformPassword not match"
    }
  }

})

userScheema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next()
})

userScheema.methods.isComparePassword = async function (password, passwordDB) {
  return await bcrypt.compare(password, passwordDB)
}



const userModel = mongoose.model("users", userScheema)
export default userModel
import mongoose from "mongoose";
import validator from "validator"
import bcrypt from "bcrypt"


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "name feild is required"]
  },
  email: {
    type: String,
    require: [true, "email feild is required"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "email feild is not email"]
  },
  password: {
    type: String,
    require: [true, "password feild is required"],
    select: false,
  },
  confirmPassword: {
    type: String,
    require: [true, "confirmPassword feild is require"],
    validate: {
      validator: function (val) {
        return val === this.password
      },
      message: "password is not matching"
    }
  },
  passwordChangeAt: {
    type: Date,
    default: new Date()
  },
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 8)
  this.confirmPassword = undefined
  next()
})

userSchema.methods.isPassChange = async function (jwtTime) {
  console.log("jwttime ", jwtTime);
  const passwordChangeAt = parseInt(this.passwordChangeAt.getTime() / 1000)
  console.log("this change pass ", passwordChangeAt);
  // If the comparison is true its mean password is change 
  // jwt time is always should greater  <  passwordChange  password change time

  return jwtTime < passwordChangeAt
  // means in the compasone jwt time stemp should always be greate then password iat

}

userSchema.methods.isComparePass = async function (pass, passDB) {
  return await bcrypt.compare(pass, passDB)
}

const userModal = mongoose.model("users", userSchema)

export default userModal
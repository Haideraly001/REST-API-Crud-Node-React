import userModel from '../model/usermodal.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const signtoken = async (id) => {
  return jwt.sign({ id: id }, 'shh98-adlk4-nvxcn3', {
    expiresIn: 1000000
  });
}

const authUser = async (req, res, next) => {
  try {
    const isUser = await userModel.create(req.body)

    const token = signtoken(isUser._id)
    res.status(200).json({
      message: "success",
      user: isUser,
      token: token,
    })
  } catch (err) {
    res.status(401).json({
      message: "fail",
      user: err.message
    })
  }
}

const loginAuth = async (req, res, next) => {

  try {
    const { email, password } = req.body


    if (!email || !password) {
      res.status(401).json({
        message: "fail",
      })
      next()
    }
    const user = await userModel.findOne({ email: email }).select('+password')
    const isMatch = await user.isComparePassword(password, user.password);
    // const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      res.status(401).json({
        message: "user no match"
      })
    }

    user.password = undefined
    const token = await signtoken(user._id)

    res.status(200).json({
      message: "success",
      user: user,
      token: token,
    })

  } catch (err) {
    res.status(401).json({
      message: "fail",
      user: err.message
    })
  }
}


export {
  authUser,
  loginAuth
}
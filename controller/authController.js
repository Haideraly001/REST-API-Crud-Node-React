import userModal from "../model/usermodal.js";
import jwt from "jsonwebtoken"

const tokenAssign = (id) => {
  return jwt.sign({ id: id }, process.env.token_Str, {
    expiresIn: "5m",
  });
}



const authUser = async (req, res) => {
  try {
    const body = req.body
    const user = await userModal.create(body);

    const token = tokenAssign(user._id)
    res.status(201).json({
      message: "true",
      token: token,
      user: user
    })
  } catch (err) {
    res.status(401).json({
      message: "fail",
      error: err.message
    })
  }
}

const loginAuth = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await userModal.findOne({ email: email }).select('+password')
    if (!user) {
      res.status(401).json({
        message: "user not founds",
        error: err.message
      })
    }


    const isMatch = await user.isComparePass(password, user.password)
    if (!isMatch) {
      res.status(401).json({
        message: "user not password not match",
        error: err.message
      })
    }

    user.password = undefined
    const token = tokenAssign(user._id)

    res.status(201).json({
      message: "true",
      token,
      user: user
    })
  } catch (err) {
    res.status(401).json({
      message: "fail",
      error: err.message
    })
  }

}

export {
  loginAuth,
  authUser
}
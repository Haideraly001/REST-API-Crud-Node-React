import userModel from "../model/usermodal.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { sendEmail } from "../utility/email.js";


const assignToken = (id) => {
  return jwt.sign({ id: id }, process.env.token_Str, {
    expiresIn: "5m",
  });
}

const authUser = async (req, res) => {
  try {
    const user = await userModel.create(req.body);

    const token = assignToken(user._id)
    res.status(201).json({
      message: "create user",
      token: token,
      user: user
    })
  } catch (err) {
    res.status(401).json({
      message: 'fail',
      error: err.message
    })
  }
}

const loginAuth = async (req, res) => {
  try {
    const { password, email } = req.body
    const user = await userModel.findOne({ email: email }).select("+password")
    // const compare = bcrypt.compare(password, user.password)
    const compare = user.comparePassword(password, user.password)
    let token
    if (compare) {
      token = assignToken(user._id)
    }
    user.password = undefined
    res.status(201).json({
      status: "user login success",
      token: token,
      user: user
    })

  } catch (err) {
    res.status(401).json({
      message: 'fail',
      error: err.message
    })
  }
}

const forgetAuth = async (req, res, next) => {

  //1 if user exist of not  found user 
  const user = await userModel.findOne({
    email: req.body.email
  })

  if (!user) {
    res.status(401).json({
      status: "user not found",
    })
  }

  // 2 create token 

  const token = user.generateResetPasswrodToken()
  await user.save()

  // 3 send token back to the user email
  const email = `${req.protocol}://${req.get('host')}/api/user/ResetPassword${token}`
  const message = ` receive an password reset Request. want to reset your password ${email}`
  try {
    await sendEmail({
      email: user.email,
      subject: 'password reset request',
      message: message
    })

    res.status(201).json({
      status: "success",
      messaeg: "reset mail has been send"
    })

  }
  catch (err) {
    res.status(401).json({
      status: "user not found",
    })
  }

}



export {
  authUser, loginAuth, forgetAuth
}
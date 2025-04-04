import userModal from "../model/user-model.js";
import jwt from 'jsonwebtoken'
import { emailSender } from "../utility/email.js";
import bcrypt from "bcrypt"

const jwtToken = function (id) {
  const token = jwt.sign({ id: id }, "34YT-h5R0-34B2", {
    expiresIn: "5m"
  });
  return token
}

const signupUser = async (req, res) => {
  try {
    const userCreate = await userModal.create(req.body)
    console.log(userCreate);
    const token = jwtToken(userCreate._id)
    res.status(201).json({
      status: "success",
      user: userCreate,
      token: token
    })
  } catch (err) {
    res.status(401).json({
      "status": "fail",
      "err": err.message
    })
  }
}

const loginUser = async (req, res) => {
  try {
    const user = await userModal.findOne({ email: req.body.email }).select("+password")

    if (!user) {
      return res.status(401).json({
        "status": "fail",
        "err": "User not found"
      })
    }
    // const verify = await bcrypt.compare(req.body.password, user.password)
    const verify = await user.passwordMatch(req.body.password, user.password)

    if (!verify) {
      return res.status(401).json({
        "status": "fail",
        "err": "password did't match please try again"
      })
    }
    console.log("verifylogin", verify);


    user.password = undefined

    const token = jwtToken(user._id)

    res.status(201).json({
      status: "successful login",
      user: user,
      token: token
    })
  } catch (err) {
    res.status(401).json({
      "status": "fail",
      "err": err.message
    })
  }
}

const protectedRoute = async (req, res, next) => {
  try {
    const gettoken = req.headers.authorization
    const token = gettoken.split(" ")[1];

    console.log(token);


    // verify token 
    const isVerify = jwt.verify(token, "34YT-h5R0-34B2")
    if (!isVerify) {
      return res.status(401).json({
        status: "fail",
        err: "token is not valid"
      })
    }
    // console.log(isVerify);
    // console.log(new Date(isVerify.exp * 1000).toLocaleString());


    const userCheck = await userModal.findOne({ _id: isVerify.id })

    if (!userCheck) {
      return res.status(401).json({
        status: "fail",
        err: "user is exist"
      })
    }
    // console.log(userCheck);
    req.user = userCheck

    next()
  } catch (err) {
    res.status(401).json({
      message: err.message
    })
  }
}

const forgetPassword = async (req, res) => {
  try {
    console.log(req.body);

    // const userFind = await userModal.findOne({ email: req.body.email }).select("+password")
    const userFind = await userModal.findOne({ email: req.body.email })
    // console.log(userFind);


    const sendEmail = userFind.email
    const port = req.headers.host

    const randomToken = await userFind.randomToken()

    const text = `Please its you. how is verify the account please go throught to this link the reset password http://${port}/api/v1/auth/resetPassword/?token=${randomToken}`

    await userModal.updateOne({
      _id: userFind._id,
    }, {
      $set: {
        resetPasswordToken: randomToken,
        resetPasswordTokenExpair: new Date(Date.now() + 15 * 60 * 1000)
      }
    })

    await emailSender({
      sendEmail,
      text
    })


    res.status(201).json({
      user: "success",
      message: "message has been send to your email"
    })
  } catch (err) {
    res.status(201).json({
      status: "fail",
      error: err.message
    })
  }
}

const resetPassword = async (req, res, next) => {
  try {

    // console.log("token", req.query.token);
    // console.log("req.body:", req.body);

    const { token } = req.query

    if (!token) {
      return res.status(400).json({ message: "Token is missing" });
    }
    // const userVerify = await userModal.find({ resetPasswordToken: token, resetPasswordTokenExpair: { $gt: new Date(Date.now()) } })
    const userVerify = await userModal.findOne({ resetPasswordToken: token, })
    if (!userVerify) {
      return res.status(400).json({ message: "user Not verify" });
    }

    // const userVerifyTime = new Date(userVerify.resetPasswordTokenExpair).toLocaleString()
    const userVerifyTime = new Date(userVerify.resetPasswordTokenExpair).getTime() * 1000 / 1000

    const newDate = Date.now()

    if (newDate > userVerifyTime) {
      return res.status(400).json({ message: "Oops Verify token Expaire please genrate new one" });
    }

    const passwordChange = await bcrypt.hash(req.body.resetPassword, 12)

    await userModal.findOneAndUpdate(
      { _id: userVerify._id },
      {
        $set: {
          resetPasswordToken: undefined,
          resetPasswordTokenExpair: undefined,
          password: passwordChange
        }
      }
    )




    res.status(201).json({
      status: "success",
      message: "Password Reset succesfully"
    })

    next()
  } catch (err) {
    return res.status(400).json({ Error: "fail", message: err.message });
  }
}

export {
  signupUser,
  loginUser,
  protectedRoute,
  forgetPassword,
  resetPassword
}
import userModel from "../model/usermodal.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { sendEmail } from "../utility/email.js";


const assignToken = (id) => {
  return jwt.sign({ id: id }, process.env.token_Str, {
    expiresIn: "15m",
  });
}

const protectedRoute = async (req, res, next) => {
  try {

    // 1. firs check the user has token or not 
    let token = req.headers.authorization
    token = token.split(" ")[1]

    // 2. verfity the token 
    const isVerify = jwt.verify(token, process.env.token_Str)
    if (isVerify) {
      console.log("isverify", isVerify);
      // console.log("expire time", new Date(isVerify.exp * 1000).toLocaleString());
    }

    // 3 check the user exist ur not 
    const user = await userModel.findOne({ _id: isVerify.id })

    if (!user) {
      res.status(401).json({
        message: "User not Exist"
      })
    }

    // 4. check if the password change or not 
    const changetime = await user.passwordChangeCheck(isVerify.iat)
    if (changetime) {
      res.status(402).json({
        message: "password has change you should login again"
      })
    }

    // 5. protected Route
    req.user = user

    next()
  } catch (err) {
    res.status(401).json({
      message: err.message === "jwt expired" && "token is expaire"
    })
  }

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
  const email = `${req.protocol}://${req.get('host')}/api/user/resetPassword/${token}`
  const message = ` receive an password reset Request. want to reset your password click on the link ${email}`
  try {
    await sendEmail({
      email: user.email,
      subject: 'password reset request',
      message: message,
      from: process.env.from
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

const resetPassword = async (req, res, next) => {
  try {
    const token = req.params.token
    console.log(token);

    const user = await userModel.findOne({
      passwordResetToken: token,
      // passwordResetTokenExpire: {$gt: Date.now()}
    }).select("+password")

    if (!user) {
      res.status(401).json({
        status: "user not found with token ",
      })
    }

    const userTime = user.passwordResetTokenExpire.getTime()
    console.log(userTime, Date.now());


    if (userTime < Date.now()) {
      return res.status(401).json({
        status: "Token has been expire",
        error: err.message
      })
    }

    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    // user.comparePassword(req.body.password, user.password);

    user.passwordResetToken = undefined;
    user.passwordResetTokenExpire = undefined;
    user.passwordChangeAt = Date.now()
    await user.save();

    res.status(201).json({
      status: "user hass reset"
    })

  } catch (err) {
    res.status(401).json({
      status: "user not found",
      error: err.message
    })
  }
}


const changePassword = async (req, res) => {
  try {
    // "GET current user from database"
    const user = await userModel.findById(req.user.id).select("+password")


    // "check the given password is match with the login user"
    const compare = await user.comparePassword(req.body.currentPassword, user.password)

    if (!compare) {
      res.status(402).json({
        status: "fail",
        error: "user password not compare"

      })
    }

    // if the supplier is correct update the user Password with the value
    user.password = req.body.newPassword
    user.confirmPassword = req.body.confirmPassword
    const token = assignToken(user.id)
    await user.save();

    // second methods is 
    // const update = await userModel.updateOne(
    // { _id: req.user.id }, 
    // { $set : {password, req.body.newPassword}}
    // )
    // same with findOneandUpdate
    // Without $set → Entire document is replaced with the new object (risky).
    // With $set → Only specified fields are updated, keeping everything else safe.


    res.status(201).json({
      status: "success",
      date: "password update",
      token: token

    })
  } catch (err) {
    res.status(401).json({
      status: "fail",
      error: err.message

    })
  }

}

const updateMe = async (req, res, next) => {

}




export {
  authUser, loginAuth, forgetAuth, resetPassword, changePassword, updateMe, protectedRoute
}
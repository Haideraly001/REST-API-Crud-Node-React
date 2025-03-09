import userModel from '../model/usermodal.js'
import jwt from 'jsonwebtoken'



const authUser = async (req, res, next) => {
  try {
    const isUser = await userModel.create(req.body)

    const token = jwt.sign({ id: isUser._id }, 'shh98-adlk4-nvxcn3', {
      expiresIn: 1000000
    });
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


export {
  authUser
}
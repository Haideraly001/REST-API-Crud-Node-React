import userModel from '../model/usermodal.js'


const authUser = async (req, res, next) => {
  try {
    const isUser = await userModel.create(req.body)
    res.status(200).json({
      message: "success",
      user: isUser
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
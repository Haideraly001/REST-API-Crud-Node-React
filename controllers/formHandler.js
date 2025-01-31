import fs from "fs"
const formDATA = JSON.parse(fs.readFileSync('./form.json', 'utf-8'))


const getForm = (req, res) => {
  res.status(200).json({
    status: true,
    message: formDATA,
    message: "success"
  })
}

const getFormById = (req, res) => {
  const url = req.params.id * 1

  const formbyid = formDATA.find((el) => el === url)
  console.log(formbyid);

  res.status(200).json({
    status: "success",
    Date: req.Date,
    newdate: req.newDate,
    message: formbyid,
  })
}

export {
  getForm,
  getFormById
}
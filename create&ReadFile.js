import readline from "readline"
import fs from "fs"

const text = fs.readFileSync("./controller/input.txt", "utf-8")

// console.log("text", text);

const content = `${text} you will become a billionaire`

const writetext = fs.writeFileSync("./controller/output.txt", content)




fs.readFile("./controller/output.txt", "utf-8", (error1, data1) => {
  console.log(data1);
  fs.readFile("./controller/input.txt", "utf-8", (error2, data2) => {
    console.log(data2);
    fs.writeFile('./controller/append.txt', `${data1}\n\n${data2}\n\n${new Date()}`, (err, data3) => {
      console.log(data3);
    })
  })
})
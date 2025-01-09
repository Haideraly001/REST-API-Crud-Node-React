import readline from "readline"
import fs, { write } from "fs"

const text = fs.readFileSync("./controller/input.txt", "utf-8")

console.log("text", text);

const content = `${text} you will become a billionaire`

const writetext = fs.writeFileSync("./controller/output.txt", content)





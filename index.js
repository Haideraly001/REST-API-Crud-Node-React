import readline from "readline"
import fs from "fs"
import http from "http"

let a = 1;
let b = 0
let c = b + a
const usedata = () => {
  ++c
  return c
}

const html = fs.readFileSync("./template/index.html", "utf-8")

const server = http.createServer((req, res) => {

  const path = req.url
  const jsonData = fs.readFileSync("./user.json", "utf-8")
  // console.log("data");


  if (path === "/") {
    res.writeHead(200, {
      "Content-Type": "text/html",
      "my-header": "Home"
    })
    res.end(html.replace("{{%CONTENT%}}", "This is Home Page"))

  } else if (path.toLocaleLowerCase() === "/home") {
    res.writeHead(200, {
      "Content-Type": "text/html",
      "my-header": "Home"
    })
    res.end(html.replace("{{%CONTENT%}}", "This is Product Page"))
  } else if (path.toLocaleLowerCase() === "/about") {
    res.writeHead(200)
    res.end(html.replace("{{%CONTENT%}}", "This is About Page"))

  } else if (path.toLocaleLowerCase() === "/data") {
    res.writeHead(200, {
      "Content-Type": "application/json",
      "my-header": "api"
    })
    res.end(jsonData)

  } else {
    res.writeHead(400)
    res.end(html.replace("{{%CONTENT%}}", "Error, 404 Page not found"))

  }
  console.log("New Request ", usedata())
})

server.listen("8000", () => {
  console.log("Server is running on port 127.0.0.1:8000")
})
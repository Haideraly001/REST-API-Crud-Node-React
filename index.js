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
  if (path === "/") {
    res.writeHead(200, {
      "Content-Type": "text/html",
      "my-header": "Home"
    })
    res.end(html)
  } else if (path.toLocaleLowerCase() === "/home") {
    res.writeHead(200, {
      "Content-Type": "text/html",
      "my-header": "Home"
    })
    res.end("you are in Home Page")
  } else if (path.toLocaleLowerCase() === "/about") {
    res.writeHead(200)
    res.end("you are in About Page")
  } else {
    res.writeHead(400)
    res.end("404 not found")
  }
  console.log("New Request ", usedata())
})

server.listen("8000", "127.0.0.1", () => {
  console.log("Server is running on port 127.0.0.1:8000")
})
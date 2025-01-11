import readline from "readline"
import fs from "fs"
import http from "http"

const server = http.createServer((req, res) => {
  // res.writeHead(200, { "Content-Type": "text/plain" })
  res.end("Hello World")
  console.log("a new request receive")
})

server.listen("8000", "127.0.0.1", () => {
  console.log("Server is running on port 127.0.0.1:8000")
})
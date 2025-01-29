import fs from "fs"
import http from 'http'

const port = 8000;

const detailData = JSON.parse(fs.readFileSync('./data.json',))
const index = fs.readFileSync("./template/index.html")



const server = http.createServer((req, res) => {
  const path = req.url
  if (path === "/") {
    res.writeHead(200, { "Content-Type": "text/html" })
    res.write("<h1>Home Page</h1>")
    res.end()
  } else if (path === "/about") {
    res.writeHead(200, {
      "Content-Type": "text/html"
    })
    res.write(index)
    res.end()
  } else {
    res.writeHead(404, {
      "Content-Type": "text/html"
    })
    res.write("<h1>404 Not Found</h1>")
  }
})

server.listen(port)

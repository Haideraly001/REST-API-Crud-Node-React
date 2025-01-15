
// ------stream data solution 1
// server.on("request", (req, res) => {
//   const data = fs.readFile("./template/index.html", (err, data) => {

//     if (err) {
//       res.end('something went wrong!')
//     }
//     res.end(html)
//   })
// })

// ------stream data solution 2 stream method
// large file in chunks   corns ( backpresser)
server.on('request', (req, res) => {
  let rs = fs.readFile("./template/index.html")

  rs.on('data', (chuck) => {
    res.write(chuck)
  })

  rs.on("end", () => {
    res.end()
  })
  rs.on('error', (error) => {
    res.end(error.message)
  })
})


// ------stream data solution 3 Pipe method method

server.on("request", (req, res) => {
  let rs = fs.readFile("./template/index.html")
  rs.pipe(res)
})
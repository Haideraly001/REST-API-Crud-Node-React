require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/about', (req, res) => {
  res.send('About me')
})

app.get('/login', (req, res) => {
  res.send('<h1>Login Page</h1>')
})

app.listen(process.env.PORT, () => {
  console.log(`Exampl e app listening on port ${port}`)
})
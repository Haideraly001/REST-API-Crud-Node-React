import express from "express"
const app = express()
const port = process.env.PORT || 3000

const jokes = [
  {
    "id": 1,
    "title": "a joke",
    "joke": "Why couldn't the bicycle stand up by itself? Because it was two",
  },
  {
    "id": 2,
    "title": "second joke",
    "joke": "What do you call a fake noodle? An impasta",
  },
  {
    "id": 3,
    "title": "Third joke",
    "joke": "Why did the scarecrow win an award? Because he was outstanding in",
  },
  {
    "id": 4,
    "title": "Forth joke",
    "joke": "What do you call a can opener that doesn't work? A can"
  },
]


app.get('/', (req, res) => {
  res.send('send a server')
})

app.get('/jokes', (req, res) => {
  res.send(jokes)
})


app.listen(port, () => {
  console.log(`Exampl e app listening on port ${port}`)
})
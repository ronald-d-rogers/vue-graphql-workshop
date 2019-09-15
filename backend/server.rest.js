const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./database.js')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors())

app.use('/assets', express.static('assets'))

app.get('/articles', (req, res) => {
  res.send(db.getArticles())
})

app.get('/article/:id', (req, res) => {
  res.send(db.getArticle(req.params.id))
})

app.get('/authors', (req, res) => {
  res.send(db.getAuthors())
})

app.get('/author/:id', (req, res) => {
  res.send(db.getAuthors(req.params.id))
})

app.put('/author/:id', (req, res) => {
  res.send(db.updateAuthor(req.params.id, req.body))
})

const port = process.env.PORT || 3000

// Start the server
app.listen(port, () => {
  console.log(`Server started on at localhost:${port}`)
})

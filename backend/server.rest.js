const express = require('express')

const db = require('./database.js')

const v1 = express.Router()
v1.use(express.json())
v1.use(express.urlencoded({ extended: true }))

v1.get('/articles', (req, res) => {
  if (res.body && res.body.authorId) {
    res.send(db.getArticles({ filter: { authors: { id: res.body.authorId } } }))
    return
  }

  res.send(db.getArticles())
})

v1.get('/article/:id', (req, res) => {
  res.send(db.getArticle(req.params.id))
})

v1.get('/authors', (req, res) => {
  if (res.body && res.body.articleId) {
    res.send(db.getAuthors({ filter: { article: { id: res.body.articleId } } }))
    return
  }

  res.send(db.getAuthors())
})

v1.get('/author/:id', (req, res) => {
  res.send(db.getAuthor(req.params.id))
})

v1.put('/author/:id', (req, res) => {
  res.send(db.updateAuthor(req.params.id, req.body))
})

module.exports = v1


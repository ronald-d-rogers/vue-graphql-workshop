const express = require('express')

const db = require('./database.js')

const v1 = express.Router();
v1.use(express.json());
v1.use(express.urlencoded({ extended: true }));

v1.get('/articles', (req, res) => {
  res.send(db.getArticles())
})

v1.get('/article/:id', (req, res) => {
  res.send(db.getArticle(req.params.id))
})

v1.get('/authors', (req, res) => {
  res.send(db.getAuthors())
})

v1.get('/author/:id', (req, res) => {
  res.send(db.getAuthors(req.params.id))
})

v1.put('/author/:id', (req, res) => {
  res.send(db.updateAuthor(req.params.id, req.body))
})

module.exports = v1


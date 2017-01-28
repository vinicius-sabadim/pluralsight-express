const express = require('express')
const adminRouter = express.Router()
const mongodb = require('mongodb').MongoClient

const books = [{
  title: 'Lord of the rings',
  bookId: 33,
  author: 'Tolkien'
}, {
  title: 'Harry Potter',
  bookId: 3,
  author: 'Rowling'
}, {
  title: 'Game of thrones',
  bookId: 13496,
  author: 'George Martin'
}]

function router() {
  adminRouter.route('/addBooks')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017/libraryApp'
      mongodb.connect(url, (err, db) => {
        const collection = db.collection('books')
        collection.insertMany(books, (err, results) => {
          res.send(results)
          db.close()
        })
      })
    })

  return adminRouter
}

module.exports = router

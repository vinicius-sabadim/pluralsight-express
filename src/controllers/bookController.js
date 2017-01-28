const mongodb = require('mongodb').MongoClient
const objectId = require('mongodb').ObjectID

function bookController(bookService, nav) {
  const url = 'mongodb://localhost:27017/libraryApp'

  function middleware(req, res, next) {
    if (!req.user) {
      res.redirect('/')
    }
    next()
  }

  function getIndex(req, res) {
    mongodb.connect(url, (err, db) => {
      const collection = db.collection('books')
      collection.find({}).toArray((err, results) => {
        res.render('bookListView', {
          title: 'My title',
          books: results,
          nav
        })
        db.close()
      })
    })
  }

  function getById(req, res) {
    const id = new objectId(req.params.id)
    mongodb.connect(url, (err, db) => {
      const collection = db.collection('books')
      collection.findOne({ _id: id }, (err, results) => {
        bookService.getBookById(results.bookId, (err, book) => {
          results.book = book
          res.render('bookView', {
            title: 'My title',
            book: results,
            nav
          })
        })
        db.close()
      })
    })
  }

  return {
    middleware,
    getIndex,
    getById
  }
}

module.exports = bookController

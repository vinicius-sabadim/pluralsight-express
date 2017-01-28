const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const mongodb = require('mongodb').MongoClient

module.exports = function() {
  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  }, (username, password, done) => {
    const url = 'mongodb://localhost:27017/libraryApp'
    mongodb.connect(url, (err, db) => {
      const collection = db.collection('users')
      collection.findOne({ username }, (err, results) => {
        results.password === password ?
          done(null, results) :
          done(null, false, { message: 'Wrong password' })
        db.close()
      })
    })
  }))
}

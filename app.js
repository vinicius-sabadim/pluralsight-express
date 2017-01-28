const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

let app = express()
const port = process.env.PORT || 5000
const nav = [{
  link: '/authors',
  text: 'Authors'
}, {
  link: '/books',
  text: 'Books'
}]
const bookRouter = require('./src/routes/bookRoutes')(nav)
const adminRouter = require('./src/routes/adminRoutes')()
const authRouter = require('./src/routes/authRoutes')()

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(session({ secret: 'library' }))
require('./src/config/passport')(app)

// app.use(express.static('src/views'))
app.set('views', './src/views')

app.use('/books', bookRouter)
app.use('/admin', adminRouter)
app.use('/auth', authRouter)

// Jade
// app.set('view engine', 'jade')

// Handlebars
// const handlebars = require('express-handlebars')
// app.engine('.hbs', handlebars({ extname: '.hbs' }))
// app.set('view engine', '.hbs')

// Ejs
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index', {
    title: 'My title',
    nav: [{
      link: '/authors',
      text: 'Authors'
    }, {
      link: '/books',
      text: 'Books'
    }]
  })
})

app.listen(port, () => {
  console.log(`Running service on port ${ port }`)
})

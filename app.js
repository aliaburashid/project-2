const express = require('express')
const morgan = require('morgan')
const jsxEngine = require('jsx-view-engine')
const methodOverride = require('method-override')
const authorRoutes = require('./controllers/auth/routeController')
const postRoutes = require('./controllers/posts/routeController')
const apiRoutes = require('./routes/apiRoutes')
const app = express()

app.set('view engine', 'jsx')
app.engine('jsx', jsxEngine())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use((req, res, next) => {
  res.locals.data = {}
  next()
})
app.use(express.static('public'))
app.use(morgan('dev'))

// Web routes (for views)
app.use('/authors', authorRoutes)
app.use('/posts', postRoutes)

// API routes (for JSON responses)
app.use('/api', apiRoutes)

module.exports = app
// import required packages 
const express = require('express') //  Web framework for Node.js
const morgan = require('morgan') // Logs requests in your terminal (for debugging)
const jsxEngine = require('jsx-view-engine') // Lets you render .jsx view files
const methodOverride = require('method-override') // Allows PUT and DELETE requests from forms

// import routes 
const authorRoutes = require('./controllers/auth/routeController')
const postRoutes = require('./controllers/posts/routeController')
const apiRoutes = require('./routes/apiRoutes')

// set up the app
const app = express()

// set view engines 
// allows you to use JSX syntax (React-style) for views.
app.set('view engine', 'jsx')
app.engine('jsx', jsxEngine())

// middleware setup 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// Adds a blank res.locals.data object to every request
//  so you can store data to use in your views.
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
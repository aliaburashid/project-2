// Import Express and set up the router.
const express = require('express')
const router = express.Router()

const viewController = require('./viewController')
const dataController = require('./dataController')
const authorApiController = require('../auth/apiController') // Protect routes (check token) must be logged in 
const authordataontroller = require('../auth/dataController') 

// Upload Middleware
const { upload, processImage } = require('../../middleware/upload')

// Feed page (GET /posts)
router.get('/', authordataontroller.auth, authorApiController.auth, dataController.index, viewController.index)

// New Post Form (GET /posts/new)
router.get('/new', viewController.newView)

// Create New Post (POST /posts)
// Must be logged in, Handle file upload, Resize and optimize, Save to DB, Redirect to /posts/:id
router.post('/', authordataontroller.auth, authorApiController.auth, upload.single('image'), processImage, dataController.create, viewController.redirectShow)

module.exports = router

// // index route: loads the posts and renders the page 
// router.get('/', authDataController.auth, dataController.index, viewController.index)
// // new post form, renders the create post form 
// router.get('/new', authDataController.auth, viewController.newView)
// // delete post with the given id and Redirects to homepage after
// router.delete('/:id', authDataController.auth, dataController.destroy, viewController.redirectHome)
// // updates the post and Redirects to the updated post’s page
// router.put('/:id', authDataController.auth, dataController.update, viewController.redirectShow)
// // Creates a new post, Redirects to homepage
// router.post('/', authDataController.auth, dataController.create, viewController.redirectHome)
// // edit form, Loads post data by ID and Renders the edit form
// router.get('/:id/edit', authDataController.auth, dataController.show, viewController.edit)
// // Loads a single post by ID, Renders the post page
// router.get('/:id', authDataController.auth, dataController.show, viewController.show)

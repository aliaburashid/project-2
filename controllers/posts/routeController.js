// Import Express and set up the router.
const express = require('express')
const router = express.Router()

const viewController = require('./viewController')
const dataController = require('./dataController')
const authDataController = require('../auth/dataController.js') // Protect routes (check token) must be logged in 


// Upload Middleware
const { upload, processImage } = require('../../middleware/upload')

// Feed page (GET /posts)
router.get('/', authDataController.auth, dataController.index, viewController.index)

// New Post Form (GET /posts/new)
router.get('/new', authDataController.auth, viewController.newView)

// Create New Post (POST /posts)
// Must be logged in, Handle file upload, Resize and optimize, Save to DB, Redirect to /posts/:id
router.post('/', authDataController.auth, upload.single('image'), processImage, dataController.create, viewController.redirectShow)

// POST /posts/:postId/comments - Add a comment to a post
router.post('/:postId/comments', authDataController.auth, dataController.addComment, viewController.stayOnPage)

// Show Single Post (GET /posts/:id)
router.get('/:id', authDataController.auth, dataController.show, viewController.show);

// Delete Post and redirect to profile
router.delete('/:id', authDataController.auth, dataController.deletePost, viewController.redirectToProfile);

module.exports = router

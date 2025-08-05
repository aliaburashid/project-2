const express = require('express')
const router = express.Router()
const authorApiController = require('../controllers/auth/apiController')
const postApiController = require('../controllers/posts/apiController')
const postDataController = require('../controllers/posts/dataController')

// ---------------- AUTHOR API ----------------

// sign up a new author with name, email, password)
router.post('/authors', authorApiController.createAuthor)
// Login user with email/password
router.post('/authors/login', authorApiController.loginAuthor)
// Get profile (must be logged in)
router.get('/authors/profile', authorApiController.auth, authorApiController.getProfile)
//

// ---------------- POST API ----------------
// Get all posts (for feed)
router.get('/posts', authorApiController.auth, postDataController.index, postApiController.index)



// // Get a single post 
// router.get('/posts/:id', authorApiController.auth, postDataController.index, postApiController.show)
// // Create new post
// router.post('/posts', authorApiController.auth, upload.single('image'), processImage, postDataController.create, postApiController.create)

// // Get all posts for logged-in author
// router.get('/posts', authorApiController.auth, postDataController.index, postApiController.index)
// // Get one post by ID
// router.get('/posts/:id', authorApiController.auth, postDataController.show, postApiController.show)
// // Create a new post
// router.post('/posts', authorApiController.auth, postDataController.create, postApiController.create)
// // Update a post and return it
// router.put('/posts/:id', authorApiController.auth, postDataController.update, postApiController.show)
// //  Delete a post
// router.delete('/posts/:id', authorApiController.auth, postDataController.destroy, postApiController.destroy)

module.exports = router
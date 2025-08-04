const express = require('express')
const router = express.Router()
const authorApiController = require('../controllers/auth/apiController')
const postApiController = require('../controllers/posts/apiController')
const postDataController = require('../controllers/posts/dataController')

// Author API Routes
// sign up a new author  (POST /api/authors with name, email, password)
router.post('/authors', authorApiController.createAuthor)
// Login user  (POST /api/authors/login with email/password)
router.post('/authors/login', authorApiController.loginAuthor)
// Get logged-in author's profile
router.get('/authors/profile', authorApiController.auth, authorApiController.getProfile)

// Post API Routes
// Get all posts for logged-in author
router.get('/posts', authorApiController.auth, postDataController.index, postApiController.index)
// Get one post by ID
router.get('/posts/:id', authorApiController.auth, postDataController.show, postApiController.show)
// Create a new post
router.post('/posts', authorApiController.auth, postDataController.create, postApiController.create)
// Update a post and return it
router.put('/posts/:id', authorApiController.auth, postDataController.update, postApiController.show)
//  Delete a post
router.delete('/posts/:id', authorApiController.auth, postDataController.destroy, postApiController.destroy)

module.exports = router
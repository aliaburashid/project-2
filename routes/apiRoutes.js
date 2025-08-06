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



module.exports = router
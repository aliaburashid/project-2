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

module.exports = router

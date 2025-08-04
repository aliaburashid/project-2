// Import Express and set up the router.
const express = require('express')
const router = express.Router()

const viewController = require('./viewController')
const dataController = require('./dataController')
const authDataController = require('../auth/dataController') // Protect routes (check token) must be logged in 

// index route: loads the posts and renders the page 
router.get('/', authDataController.auth, dataController.index, viewController.index)
// new post form, renders the create post form 
router.get('/new', authDataController.auth, viewController.newView)
// delete post with the given id and Redirects to homepage after
router.delete('/:id', authDataController.auth, dataController.destroy, viewController.redirectHome)
// updates the post and Redirects to the updated post’s page
router.put('/:id', authDataController.auth, dataController.update, viewController.redirectShow)
// Creates a new post, Redirects to homepage
router.post('/', authDataController.auth, dataController.create, viewController.redirectHome)
// edit form, Loads post data by ID and Renders the edit form
router.get('/:id/edit', authDataController.auth, dataController.show, viewController.edit)
// Loads a single post by ID, Renders the post page
router.get('/:id', authDataController.auth, dataController.show, viewController.show)

module.exports = router
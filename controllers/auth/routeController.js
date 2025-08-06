// Import Express and set up the router.
const express = require('express')
const router = express.Router()

// handles logic like saving users or checking login.
const dataController = require('./dataController')
// shows the forms (Sign Up / Login pages).
const viewController = require('./viewController')
// postsViewController redirects to home after login.
const postsViewController = require('../posts/viewController')
const { upload, processImage } = require('../../middleware/upload');

// POST /authors → Creates a new user using createAuthor and Redirects to login page when done
router.post('/', dataController.createAuthor, viewController.redirectToLogin)

// Renders the sign-up form (usually SignUp.jsx)
router.get('/', viewController.signUp)

// POST /authors/login → Log in user, Validates login, then redirects to the posts homepage
router.post('/login', dataController.loginAuthor, postsViewController.redirectHome)

// Renders the login form (usually SignIn.jsx)
router.get('/login', viewController.signIn)

// edit profile 
router.put('/profile', dataController.auth, upload.single('profilePicture'), processImage, dataController.updateProfile, viewController.redirectToLogin)

// Profile Page
router.get('/profile', dataController.auth, dataController.showProfile, viewController.showProfile)


module.exports = router
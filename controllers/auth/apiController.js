const Author = require('../../models/author')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Middleware to protect routes (API version)
exports.auth = async (req, res, next) => {
  try {
     // 1. Get the token from the Authorization header
    const token = req.header('Authorization').replace('Bearer ', '')
    // 2. Verify the token using your secret key
    const data = jwt.verify(token, 'secret')
    // 3. Find the author by ID from token payload
    const author = await Author.findOne({ _id: data._id })
     // 4. If no user found, throw error
    if (!author) {
      throw new Error()
    }
    // 5. Attach author to the request for use in next functions
    req.author = author
    next()
  } catch (error) {
    res.status(401).send('Not authorized')
  }
}

// Create New Author (Signup)
exports.createAuthor = async (req, res) => {
  try {
    // 1. Check required fields
    if (!req.body.name || !req.body.email || !req.body.password) {
      return res.status(400).json({ message: 'Name, email, and password are required' })
    }
    // 2. Create and save the new author
    const author = new Author(req.body)
    await author.save()
    // 3. Generate a token and return it with the author data
    const token = await author.generateAuthToken()
    res.status(201).json({ author, token })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Log in Author 
exports.loginAuthor = async (req, res) => {
  try {
     // 1. Find the user by email
    const author = await Author.findOne({ email: req.body.email })
    // 2. If no user or wrong password, return error
    if (!author || !await bcrypt.compare(req.body.password, author.password)) {
      return res.status(400).json({ message: 'Invalid login credentials' })
    }
     // 3. Generate token and return with author
    const token = await author.generateAuthToken()
    res.json({ author, token })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Get Current Author Profile
exports.getProfile = async (req, res) => {
  try {
    // Populate posts (one-to-many relationship)
    await req.author.populate('posts')
    // Return the full profile including posts
    res.json({ author: req.author })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
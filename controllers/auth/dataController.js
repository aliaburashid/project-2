const Author = require('../../models/author')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Protect Routes (Check Token)
exports.auth = async (req, res, next) => {
    try {
        let token
        // 1. Check if token is in the URL query (?token=...)
        if (req.query.token) {
            token = req.query.token
            // 2. Or check if token is in the request header (Authorization: Bearer ...)
        } else if (req.header('Authorization')) {
            token = req.header('Authorization').replace('Bearer ', '')
            // 3. If no token found, throw an error
        } else {
            throw new Error('No token provided')
        }
        // 4. Verify the token using the secret key
        const data = jwt.verify(token, 'secret')
        // 5. Find the author in the database using the ID from the token
        const author = await Author.findOne({ _id: data._id })
        // 6. If no author is found, throw an error
        if (!author) {
            throw new Error()
        }
        // 7. Attach the author and token to the request and response locals
        req.author = author
        res.locals.data.token = token
        // 8. Move on to the next middleware or route handler
        next()
    } catch (error) {
        res.status(401).send('Not authorized')
    }
}

// Register New Author
exports.createAuthor = async (req, res, next) => {
    try {
        // Creates a new Author from form or API input (req.body)
        const author = new Author(req.body)
        // Saves it to the database
        await author.save()
        // Generates a JWT token and stores it in res.locals.data.token
        const token = await author.generateAuthToken()
        res.locals.data.token = token
        req.author = author
        next()
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// Log In Existing Author
exports.loginAuthor = async (req, res, next) => {
    try {
        // Finding the author by email
        const author = await Author.findOne({ email: req.body.email })
        // Comparing their password with the hashed password in the DB
        if (!author || !await bcrypt.compare(req.body.password, author.password)) {
            res.status(400).send('Invalid login credentials')
        } else {
            // If matched, it creates a new token
            const token = await author.generateAuthToken()
            // Sets that token and user in req and res.locals so the view/API can use it
            res.locals.data.token = token
            req.author = author
            next()
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
const Post = require('../../models/post') //  Load the Post model

// Create an object to store all controller functions
const dataController = {}

// Get All Posts for Logged-in Author
dataController.index = async (req, res, next) => {
  try {
    // Load all posts by this author
    const author = await req.author.populate('posts')
    // Store the posts in res.locals for the next controller/view
    res.locals.data.posts = author.posts
    next()
  } catch(error) {
    res.status(400).send({ message: error.message })
  }
}

// Create a New Post
dataController.create = async (req, res, next) => {
    // Convert checkbox value to boolean
  if(req.body.published === 'on'){
    req.body.published = true;
  } else if(req.body.published !== true) {
    req.body.published = false;
  }
  try {
    // Set the post's author to the logged-in user
    req.body.author = req.author._id
    // Create the new post
    res.locals.data.post = await Post.create(req.body)
    // Add this post to the author's post list (without duplicates)
    req.author.posts.addToSet({_id: res.locals.data.post._id })
    await req.author.save()
    next()
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

// Get a Single Post by ID
dataController.show = async (req, res, next) => {
  try {
    // Find post by ID in the URL (e.g. /posts/:id)
    res.locals.data.post = await Post.findById(req.params.id)
    // If no post found, throw error
    if(!res.locals.data.post){
      throw new Error(`Could not locate a post with the id ${req.params.id}`)
    }
    next()
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

// Edit a Post by ID
dataController.update = async (req, res, next) => {
    // Convert checkbox value to boolean
  if(req.body.published === 'on'){
    req.body.published = true;
  } else if(req.body.published !== true) {
    req.body.published = false;
  }
  try {
     // Update the post and return the updated version
    res.locals.data.post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
    next()
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

// Delete a Post
dataController.destroy = async (req, res, next) => {
  try {
    // Find and delete the post by ID
    await Post.findOneAndDelete({'_id': req.params.id }).then(() => {
      next()
    })
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

module.exports = dataController
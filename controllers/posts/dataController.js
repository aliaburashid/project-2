// load the models 
const Post = require('../../models/post') 
const Author = require('../../models/author')

// Create an object to store all controller functions
const dataController = {}

// Get All Posts for Logged-in Author
dataController.index = async (req, res, next) => {
  try {
    // get the currently logged-in user
    const currentUser = req.user;
    // Create a list of user IDs: who the user follows + themselve
    const followingIds = [...currentUser.following, currentUser._id];

    // Find posts where the author is in that list (followed users or self),
    // and the post is not private
    res.locals.data.posts = await Post.find({
      author: { $in: followingIds },
      isPrivate: false
    })
    // Fill in the author's name and profile picture for each post
    .populate('author', 'name profilePicture')
    // Fill in the names of users who liked each post
    .populate('likes', 'name')
    // Fill in the comments + the author's info for each comment
    .populate({
      path: 'comments',
      populate: { path: 'author', select: 'name profilePicture' }
    })
    // Sort posts: newest first
    .sort({ createdAt: -1 })
    // Limit to 20 posts max
    .limit(20);
    // Go to the next middleware (the view controller)
    next();
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Create a New Post
dataController.create = async (req, res, next) => {
  try {
    // 1. Add the logged-in user’s ID as the post author
    req.body.author = req.user._id
    // 2. Add the uploaded image path to the post
    req.body.image = req.file.path
    // 3. Create the post in the database and store it in res.locals
    res.locals.data.post = await Post.create(req.body)
    // 4. Add the post ID to the author's posts array
    req.user.posts.push(res.locals.data.post._id)
    // 5. Save the updated author document
    await req.user.save()
    // 6. Move to the next controller (usually the API controller or redirect)
    next()
  } catch (error) {
    // 7. Send error response if something goes wrong
    res.status(400).send({ message: error.message })
  }
}


// // Create a New Post
// dataController.create = async (req, res, next) => {
//     // Convert checkbox value to boolean
//   if(req.body.published === 'on'){
//     req.body.published = true;
//   } else if(req.body.published !== true) {
//     req.body.published = false;
//   }
//   try {
//     // Set the post's author to the logged-in user
//     req.body.author = req.author._id
//     // Create the new post
//     res.locals.data.post = await Post.create(req.body)
//     // Add this post to the author's post list (without duplicates)
//     req.author.posts.addToSet({_id: res.locals.data.post._id })
//     await req.author.save()
//     next()
//   } catch (error) {
//     res.status(400).send({ message: error.message })
//   }
// }

// // Get a Single Post by ID
// dataController.show = async (req, res, next) => {
//   try {
//     // Find post by ID in the URL (e.g. /posts/:id)
//     res.locals.data.post = await Post.findById(req.params.id)
//     // If no post found, throw error
//     if(!res.locals.data.post){
//       throw new Error(`Could not locate a post with the id ${req.params.id}`)
//     }
//     next()
//   } catch (error) {
//     res.status(400).send({ message: error.message })
//   }
// }

// // Edit a Post by ID
// dataController.update = async (req, res, next) => {
//     // Convert checkbox value to boolean
//   if(req.body.published === 'on'){
//     req.body.published = true;
//   } else if(req.body.published !== true) {
//     req.body.published = false;
//   }
//   try {
//      // Update the post and return the updated version
//     res.locals.data.post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
//     next()
//   } catch (error) {
//     res.status(400).send({ message: error.message })
//   }
// }

// // Delete a Post
// dataController.destroy = async (req, res, next) => {
//   try {
//     // Find and delete the post by ID
//     await Post.findOneAndDelete({'_id': req.params.id }).then(() => {
//       next()
//     })
//   } catch (error) {
//     res.status(400).send({ message: error.message })
//   }
// }

module.exports = dataController
// load the models 
const Post = require('../../models/post') 
const Author = require('../../models/author')

// Create an object to store all controller functions
const dataController = {}

// Get All Posts for Logged-in Author
dataController.index = async (req, res, next) => {
  try {
    // get the currently logged-in user
    const currentUser = req.author;
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
    req.body.author = req.author._id
    // 2. Add the uploaded image path to the post
    req.body.image = req.file.path
    // 3. Create the post in the database and store it in res.locals
    res.locals.data.post = await Post.create(req.body)
    // 4. Add the post ID to the author's posts array
    req.author.posts.push(res.locals.data.post._id)
    // 5. Save the updated author document
    await req.author.save()
    // 6. Move to the next controller (usually the API controller or redirect)
    next()
  } catch (error) {
    // 7. Send error response if something goes wrong
    res.status(400).send({ message: error.message })
  }
}

module.exports = dataController
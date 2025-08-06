// load the models 
const Post = require('../../models/post') 
const Author = require('../../models/author')
const Comment = require('../../models/comment');

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
}

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

// Handle comments 
dataController.addComment = async (req, res, next) => {
try {
    const { content } = req.body;

    const comment = await Comment.create({
      author: req.author._id,
      post: req.params.postId,
      content: content
    });

    await Post.findByIdAndUpdate(
      req.params.postId,
      { $push: { comments: comment._id } }
    );

    next();
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
}

// show a singke post 
dataController.show = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author')
      .populate({
        path: 'comments',
        populate: { path: 'author' }
      });

    res.locals.data.post = post;
    next();
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
}

// delete a post 
dataController.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    // Ensure post exists and the logged-in user is the author
    if (!post || post.author.toString() !== req.author._id.toString()) {
      return res.status(403).send({ message: 'Not authorized to delete this post' });
    }

    // Delete the post
    await Post.findByIdAndDelete(req.params.id);

    // Remove post reference from author's posts array
    await Author.findByIdAndUpdate(req.author._id, {
      $pull: { posts: req.params.id }
    });

    next();
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};


module.exports = dataController
const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    // is the body of the blog post.
    type: String,
    required: true
  },
  author: {
    // links each posts to the person (Author model) who wrote it.
    // It uses the author’s _id.
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true
  },
  published: {
    // is a true/false flag to track whether the post is live.
    type: Boolean,
    default: false
  },
  tags: [String],
  createdAt: {
    // saves the date/time when the post was created.
    type: Date,
    default: Date.now
  }
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post
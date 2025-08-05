const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true
  },
  image: {
    type: String,
    required: true // uploaded image file path
  },
  caption: {
    type: String,
    maxlength: 2200,
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Author' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  tags: [{ type: String, trim: true }],
  isPrivate: {
    type: Boolean,
    default: false
  }
}, { timestamps: true }) // adds createdAt and updatedAt automatically

// creates virtual fields called likecount 
// Every time you fetch a post and convert it to JSON (e.g. for an API or JSX view), 
// this virtual field gives you the number of likes for that post.
// Based on the length of the likes array
postSchema.virtual('likeCount').get(function() {
  return this.likes.length
})

//Counts how many Comment IDs are in the comments array
postSchema.virtual('commentCount').get(function() {
  return this.comments.length
})

// tells mongoose that when this post is converted to json 
// include any virtual fields created too 
postSchema.set('toJSON', { virtuals: true })


const Post = mongoose.model('Post', postSchema)

module.exports = Post
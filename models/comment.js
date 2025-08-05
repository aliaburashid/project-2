const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  content: { type: String, required: true, maxlength: 1000, trim: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Author' }],
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  parentComment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }
}, { timestamps: true })

const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment

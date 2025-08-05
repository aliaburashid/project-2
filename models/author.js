const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// defines the structure of the author 

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    default: ''
  },
  profilePicture: { type: String, default: '/images/default-avatar.png' },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Author' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Author' }],
  website: { type: String, trim: true },
  location: { type: String, trim: true },
  isPrivate: { type: Boolean, default: false },
  // posts stores references to Post documents.
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
},
  { timestamps: true })

// Hide password from JSON responses
// automatically removes the password field when sending author data in an API response. Safer!
authorSchema.methods.toJSON = function () {
  const author = this.toObject()
  delete author.password
  return author
}

// Hash password before saving
// Before saving a user, this checks if the password is new or changed, and then hashes it using bcrypt.
authorSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8)
  }
  next()
})

// Generate JWT token
// This method creates a JWT token containing the author’s ID. 
// You’ll use this for logging in and accessing protected routes.
authorSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id }, 'secret')
  return token
}

// Follow another author
authorSchema.methods.follow = async function(userId) {
  if (!this.following.includes(userId)) {
    this.following.push(userId)
    await this.save()

    const Author = mongoose.model('Author')
    const target = await Author.findById(userId)
    if (target && !target.followers.includes(this._id)) {
      target.followers.push(this._id)
      await target.save()
    }
  }
}

authorSchema.methods.unfollow = async function(userId) {
  this.following = this.following.filter(id => id.toString() !== userId.toString())
  await this.save()

  const Author = mongoose.model('Author')
  const target = await Author.findById(userId)
  if (target) {
    target.followers = target.followers.filter(id => id.toString() !== this._id.toString())
    await target.save()
  }
}
  
const Author = mongoose.model('Author', authorSchema)

module.exports = Author
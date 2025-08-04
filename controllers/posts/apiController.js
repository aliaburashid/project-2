// dataController does the actual DB logic (find, create, delete)
// It stores result in res.locals.data
//apiController sends that result as a JSON response to the client

const Post = require('../../models/post') // import post model

const apiController = {
  index(req, res) {
    // Send all posts (fetched earlier in dataController) as JSON
    res.json(res.locals.data.posts)
  },

  show(req, res) {
    // Send single post (fetched earlier in dataController) as JSON
    res.json(res.locals.data.post)
  },

  create(req, res) {
    // Send newly created post with HTTP 201 Created
    res.status(201).json(res.locals.data.post)
  },

  destroy(req, res) {
    // Send success message if post was deleted
    res.status(200).json({ message: 'Post successfully deleted' })
  }
}

module.exports = apiController
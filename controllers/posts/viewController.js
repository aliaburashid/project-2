const { deletePost } = require("./dataController");

const RESOURCE_PATH = '/posts'

const viewController = {
  // Show the feed (home page after login)
  index(req, res, next) {
    res.render('posts/Feed', res.locals.data)
  },

  // show the upload a new post form 
  newView(req, res, next) {
    res.render('posts/NewPost', { token: res.locals.data.token })
  },

  stayOnPage(req, res) {
    res.redirect(req.get('referer')); // sends user back to the same page
  },

  show(req, res) {
    res.render('posts/ShowPost', { post: res.locals.data.post, token: res.locals.data.token || req.query.token, });
  },

  // Redirect to feed the newly created post
  redirectShow(req, res, next) {
    const token = req.query.token
    res.redirect(`${RESOURCE_PATH}?token=${token}`)
  },

  // redirect to profile after deleting a post 
  // controllers/posts/viewController.js
  redirectToProfile(req, res) {
    const token = res.locals.data.token || req.query.token
    res.redirect(`/authors/profile?token=${token}`);
},

  // redirects to feed after login 
  redirectHome(req, res, next) {
    if (res.locals.data.token) {
      res.redirect(`${RESOURCE_PATH}?token=${res.locals.data.token}`)
    } else {
      res.redirect(RESOURCE_PATH)
    }
  }
}

module.exports = viewController

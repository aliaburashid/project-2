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

  // Redirect to feed the newly created post
  redirectShow(req, res, next) {
  const token = req.query.token
  res.redirect(`${RESOURCE_PATH}?token=${token}`)
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

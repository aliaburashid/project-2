const RESOURCE_PATH = '/posts'

const viewController = {
  // Show the feed (home page after login)
  index(req, res, next) {
    res.render('posts/Feed', res.locals.data)
  },

  // show the upload a new post form 
  newView(req, res, next) {
    res.render('posts/NewPost', { token: req.query.token })
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


// // Renders all posts (GET /posts)
// viewController.index = (req, res) => {
//   const { posts } = res.locals.data
//   const token = res.locals.data.token
//   res.render('posts/Index', { posts, token })
// }

// // Renders the New Post form (GET /posts/new)
// viewController.newView = (req, res) => {
//   const token = res.locals.data.token
//   res.render('posts/New', { token })
// }

// // Renders a single post (GET /posts/:id)
// viewController.show = (req, res) => {
//   const { post } = res.locals.data
//   const token = res.locals.data.token
//   res.render('posts/Show', { post, token })
// }

// // Renders the Edit Post form (GET /posts/:id/edit)
// viewController.edit = (req, res) => {
//   const { post } = res.locals.data
//   const token = res.locals.data.token
//   res.render('posts/Edit', { post, token })
// }

// // Redirect to /posts after create/delete
// viewController.redirectHome = (req, res) => {
//     if(res.locals.data.token) {
//         res.redirect(`/posts?token=${res.locals.data.token}`)
//     } else {
//         res.redirect('/posts')
//     }
    
// }

// // Redirect to single post page after update
// viewController.redirectShow = (req, res) => {
//   const post = res.locals.data.post
//   const token = res.locals.data.token
//   res.redirect(`/posts/${post._id}?token=${token}`)
// }


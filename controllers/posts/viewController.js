const viewController = {}

// Renders all posts (GET /posts)
viewController.index = (req, res) => {
  const { posts } = res.locals.data
  const token = res.locals.data.token
  res.render('posts/Index', { posts, token })
}

// Renders the New Post form (GET /posts/new)
viewController.newView = (req, res) => {
  const token = res.locals.data.token
  res.render('posts/New', { token })
}

// Renders a single post (GET /posts/:id)
viewController.show = (req, res) => {
  const { post } = res.locals.data
  const token = res.locals.data.token
  res.render('posts/Show', { post, token })
}

// Renders the Edit Post form (GET /posts/:id/edit)
viewController.edit = (req, res) => {
  const { post } = res.locals.data
  const token = res.locals.data.token
  res.render('posts/Edit', { post, token })
}

// Redirect to /posts after create/delete
viewController.redirectHome = (req, res) => {
    if(res.locals.data.token) {
        res.redirect(`/posts?token=${res.locals.data.token}`)
    } else {
        res.redirect('/posts')
    }
    
}

// Redirect to single post page after update
viewController.redirectShow = (req, res) => {
  const post = res.locals.data.post
  const token = res.locals.data.token
  res.redirect(`/posts/${post._id}?token=${token}`)
}

module.exports = viewController

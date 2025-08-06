const viewController = {

// Renders the Sign Up form (GET /authors)
signUp(req, res, next) {
    res.render('auth/SignUp')
},
// Renders the Sign In form (GET /authors/login)
signIn(req, res, next){
    res.render('auth/SignIn')
},
apiAuth(req, res, next){
    res.json({ user: req.user, token: res.locals.data.token })
},
// Redirect to login page after successful signup
redirectToLogin(req, res, next){
    res.redirect('/authors/login')
},
showProfile(req, res) {
    res.render('posts/Profile', res.locals.data)
  },
editProfile(req, res, next){
    res.render('auth/EditProfile', { author: req.author, token: res.locals.data.token });
},
  redirectToProfile(req, res) {
    const token = res.locals.data.token || req.query.token
    res.redirect(`/authors/profile?token=${token}`);
}
}

module.exports = viewController

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
showProfile(req, res, next) {
    res.render('posts/Profile', res.locals.data)
  }
}
module.exports = viewController

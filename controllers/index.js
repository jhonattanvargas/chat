index = (req,res) => {
	res.render('inicio', { user: req.user, title: 'Inicio' })
}

inicio = (req,res) => {
	res.locals.title
  res.render('inicio', {  title:'Inicio'})
}

facebookError = (req,res) => {
	res.render('facebook-error', { user: req.user, title: 'Error' })
}

loginFacebook = (req,res) => {
	console.log('/login/facebook/')
	res.redirect('/')
}

loginFacebookReturn = (req,res) => {
	console.log('/login/facebook/return ')
	res.redirect('/')
}

logout = (req,res) => {
	req.logout()
  res.redirect('/')
}

profile = (req,res) => {
	res.render('profile', { user: req.user, title:req.user.displayName })
}

module.exports = {
	index,
	inicio,
	facebookError,
	loginFacebook,
	loginFacebookReturn,
	logout,
	profile
}
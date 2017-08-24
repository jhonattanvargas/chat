const Room = require('../models/room').Room

index = (req,res) => {
		res.render('inicio', { user: req.user, title: 'Inicio'})
}

external = (req,res) => {
	res.locals.title
  res.render('external', { user:req.user,  title:'Inicio'})
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
	if(req.isAuthenticated()){
		req.session.passport.url = '/profile'
		res.render('profile', { user: req.user, title:req.user.displayName })
	}else{
		res.render('inicio', {  title:'Inicio'})
	}
}

noAccess = (req,res) => {
	res.render('no-access',{user: req.user, title:'Error'})
}

room = (req,res) => {
	Room.findOne({id:req.params.id}, (err,room) => {
		if(!err && room != null){
			res.render('room',{user: req.user, title: room.name})
		}else{
			res.redirect('/')
		}
	})
}

module.exports = {
	index,
	external,
	facebookError,
	loginFacebook,
	loginFacebookReturn,
	logout,
	profile,
	noAccess,
	room
}
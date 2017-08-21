'use strict'

const express = require('express')
const routes = express.Router()
const connectEnsureLogin = require('connect-ensure-login')

//add require controllers
const ctrl = require('../controllers')

//passport for authentication
const config = require('../config')
const passport = require('passport')
const Strategy = require('passport-facebook').Strategy
const User = require('../models/user').User


//set strategy for login with facebook
passport.use(new Strategy({
		clientID: config.facebook.clientID,
	  clientSecret: config.facebook.clientSecret,
	  callbackURL: config.facebook.callbackURL,
	  profileFields: ['id', 'displayName', 'picture.type(large)','gender','birthday','profileUrl']
	}, 
	(accessToken, refreshToken, profile, cb) => {

		console.log(profile)
		//busca el usuario en la bd
		User.findOne({id: profile.id}, (err, user) => {
      if(err) throw(err)
      if(!err && user!= null) return cb(null, user)

	    //Si no está en la bd, lo crea
	  	var user = new User({
	      id          : profile.id,
	      displayName : profile.displayName,
	      gender			: profile.gender,
	      picture			: profile.photos[0].value,
	      profileUrl	: profile.profileUrl,
	      exp         : 0,
	      nivel       : 1
	    })
	    user.save( err => {
	      if(err) throw err
	      cb(null, user)
	    })
  	})
	})
)

passport.serializeUser( (user, cb) => {
  cb(null, user)
})

passport.deserializeUser( (obj, cb) => {
  cb(null, obj)
})

//add routes from page
routes.get('/', ctrl.index)
routes.get('/inicio', ctrl.inicio)
routes.get('/facebook-error', ctrl.facebookError)
routes.get('/login/facebook', passport.authenticate('facebook'), ctrl.loginFacebook)
routes.get('/login/facebook/return', passport.authenticate('facebook', { failureRedirect: '/facebook-error' }), ctrl.loginFacebookReturn)
routes.get('/logout', ctrl.logout)
routes.get('/profile', connectEnsureLogin.ensureLoggedIn(), ctrl.profile)

module.exports = {
	passport,
	routes
}

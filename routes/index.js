'use strict'

const express = require('express')
const routes = express.Router()
const connectEnsureLogin = require('connect-ensure-login')

//add require controllers
const ctrl = require('../controllers')
const api = require('../controllers/api')

//passport for authentication
const config = require('../config')
const passport = require('passport')
const Strategy = require('passport-facebook').Strategy
const User = require('../models/user').User
const facebookData = require('./facebookData')


//set strategy for login with facebook
passport.use(new Strategy({
		clientID: config.facebook.clientID,
	  clientSecret: config.facebook.clientSecret,
	  callbackURL: config.facebook.callbackURL,
	  profileFields: ['id', 'displayName', 'picture.type(large)','gender','birthday','profileUrl','friends','email']
	}, 
	(accessToken, refreshToken, profile, cb) => {
		let friends;
		facebookData.getFbData(accessToken, `/v2.10/${profile.id}/friends`, (data) => {
        console.log(data)
    })
		console.log(profile)
		//busca el usuario en la bd
		User.findOne({id: profile.id}, (err, user) => {
      if(err) throw(err)
      if(!err && user!= null) return cb(null, user)

	    //Si no está en la bd, lo crea
	  	var user = new User({
	      id          : profile.id,
	      displayName : profile.displayName,
	      email				: profile.emails[0].value,
	      gender			: profile.gender,
	      picture			: profile.photos[0].value,
	      profileUrl	: profile.profileUrl,
	      friends			: `graph.facebook.com:443/v2.10/${profile.id}/friends?access_token=${accessToken}`,
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
routes.get('/no-access',ctrl.noAccess)
routes.get('/',connectEnsureLogin.ensureLoggedIn('/external'), ctrl.index)
routes.get('/external', ctrl.external)
routes.get('/facebook-error', ctrl.facebookError)
routes.get('/login/facebook', passport.authenticate('facebook',{scope: ['user_friends','email']}), ctrl.loginFacebook)
routes.get('/login/facebook/return', passport.authenticate('facebook', {successReturnToOrRedirect: '/profile', failureRedirect: '/facebook-error' }), ctrl.loginFacebookReturn)
routes.get('/logout', ctrl.logout)
routes.get('/profile', connectEnsureLogin.ensureLoggedIn('/external'), ctrl.profile)
routes.get('/room/:id',connectEnsureLogin.ensureLoggedIn('/external'), ctrl.room)



//add routes from api
routes.post('/api/room/add',connectEnsureLogin.ensureLoggedIn('/no-access'),api.addRoom)
routes.get('/api/room',connectEnsureLogin.ensureLoggedIn('/no-access'),api.getRooms)
routes.get('/api/room/:id',connectEnsureLogin.ensureLoggedIn('/no-access'),api.getRoom)

module.exports = {
	passport,
	routes
}

'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
//const passport = require('./passport')
const helmet = require('helmet')
const combined = require('morgan')('combined')
const cookieParser = require('cookie-parser')()
const session = require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true })

const routes = require('./routes').routes
const passport = require('./routes').passport

//for security
app.use(helmet())

//for receive and send data on json format
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//for session and cookies
app.use(combined)
app.use(cookieParser)
app.use(session)

//for authentication with facebook 
app.use(passport.initialize())
app.use(passport.session())


// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//definición de carpeta publica
app.use("/public",express.static('public'));

app.use('/', routes)

module.exports = app
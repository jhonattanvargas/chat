const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://test-app:test-app@ds147995.mlab.com:47995/jhonattan-test-1')

var user_schema = new mongoose.Schema({
  id          : String, 
  displayName : String,
  gender			: String,
  picture			: String,
  profileUrl	: String,
  friends			: String,
  exp         : Number,
  nivel       : Number
})

var User = mongoose.model("User",user_schema)

module.exports = {
	User
}
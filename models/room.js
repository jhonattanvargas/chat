const mongoose = require('mongoose')
const validate = require('mongoose-validator')
const Schema = mongoose.Schema

mongoose.connect('mongodb://test-app:test-app@ds147995.mlab.com:47995/jhonattan-test-1')


//validation
var roomValidator = [
  validate({
    validator: function(val){
      return val.length > 0 
    },
    message: 'El nombre no puede ser vacío',
    httpStatus: 500
  }),
  validate({
    validator: 'isLength',
    arguments: [3, 10],
    message: 'El nombre de la sala debe ser de un largo entre {ARGS[0]} y {ARGS[1]} de caracteres.',
    httpStatus: 500
  }),
  validate({
    validator: 'isAlphanumeric',
    passIfEmpty: true,
    message: 'Sólo puede contener caracteres alfanuméricos',
    httpStatus: 500
  })
]

var room_schema = new mongoose.Schema ({
	id					: {type: String, required: true, validate:roomValidator},
	name				: {type: String, required: true, validate:roomValidator},
	onlines			: [String],
	display			: {type:String, default: 'all'},
	users				: [String],
	owner				: {type:String, required:true},
  state       : {type: String, default:'available', enum:['available','unavailable','closed']}
})

var Room = mongoose.model("Room",room_schema)

module.exports = {
	Room
}
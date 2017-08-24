const Room = require('../models/room').Room

addRoom = (req,res) => {
	let id = req.body.nombre
	Room.findOne({id: id}, (err, room) => {
		if(err) throw err
		if(!err && room != null){
			res
				.status(500)
				.send({message:'Ya existe una room con ese nombre.'})
		}else{
			let newRoom = new Room({
				id 			: id,
				name 		: id,
				owner		: req.user.id
			})

			newRoom.save( err => {
				console.log(err)
				if(err){
					let statusCode = err.errors.id.properties.httpStatus || 500
					res
						.status(statusCode)
						.send({message:err.errors.id.message})
				}else{
					res
						.status(200)
						.send({message:'Room agregada.'})
				}
			})
		}		
	})
}

getRooms = (req, res) => {
	Room.find({}, (err, rooms) => {
		if(err){
			res.status(500).send({message:'Error al solicitar las salas.'})
		}else{
			res.status(200).send(rooms)
		}
	})
}

getRoom = (req, res) => {
	Room.findOne({id:req.params.id}, (err, room) => {
		if(err){
			res.status(500).send({message:'Error al solicitar la sala.'})
		}else{
			res.status(200).send(room)
		}
	})
}


module.exports = {
	addRoom,
	getRooms,
	getRoom
}
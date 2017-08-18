const sharedsession = require("express-socket.io-session")

module.exports = (session,server) => {

	const io = require('socket.io')(server)

	io.use(sharedsession(session, {
    autoSave:true
	}))

	io.on('connection', (socket) => {
    console.log("Session: ", socket.handshake.session);
	})

	return io
}
const sharedsession = require("express-socket.io-session")

module.exports = (session,server) => {

	const io = require('socket.io')(server)

	io.use(sharedsession(session, {
    autoSave:true
	}))

	const globalData = {
		onlines: new Array()
	}

	io.on('connection', (socket) => {
    console.log("Session: ", socket.handshake.session);
    let user = socket.handshake.session.passport == undefined ? undefined : socket.handshake.session.passport.user
    if(user != undefined && globalData.onlines.find(x => x.id == user.id) == null ){
    	globalData.onlines.push({id:user.id,displayName:user.displayName,total_tab:1})    	
    	io.sockets.emit('globalData',globalData)
    }else{
    	globalData.onlines.map(x => x.id == user.id ? x.total_tab ++ : null)
    }

    socket.on('disconnect', () => {
    	if(user != undefined){
    		globalData.onlines.forEach( (x,i) => {
    			if(x.id == user.id)
    				if(x.total_tab > 1)
    					x.total_tab --
    				else
    					globalData.onlines.splice(i,1)
    		})
    		io.sockets.emit('globalData',globalData)
    	}    		
    })
	})

	return io
}
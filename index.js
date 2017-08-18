'use strict'

const config = require('./config')
const app = require('./app').app
const server = require('http').Server(app)
const io = require('./io')(require('./app').session,server)

server.listen(config.port,()=>{
  console.log(`Server runing on ${config.base_url}.`)
})

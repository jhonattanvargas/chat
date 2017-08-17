'use strict'

const config = require('./config')
const app = require('./app')


app.listen(config.port, () =>{
    console.log(`Servidor corriendo en ${config.base_url}`)
})

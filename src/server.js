require('./config.js')
const http = require('http')

const server = http.createServer(function(req, res){
    res.end("Tamo aqui")
})

server.listen(process.env.PORT)

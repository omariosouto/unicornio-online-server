require('./config.js')
const http = require('http')

http.createServer(function(req, res){
    res.end("Tamo aqui")
})
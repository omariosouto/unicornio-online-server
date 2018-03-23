require('./config.js')
const Express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = new Express()

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req,res) => {
    res.send('Alo alo, w brazil')
})

app.post('/compiler', (req,res) => {
    // res.status(201)
    res.send(req.body)
})

app.listen(process.env.PORT)

require('./config.js')
const Express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = new Express()

const Compiler = require('./compilers/SphereEngine/SphereEngineService')
const compilerTypes = require('./compilers/SphereEngine/SphereEngineLanguageTypes')

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req,res) => {
    res.send('Alo alo, w brazil')
})

app.post('/compiler', (req,res) => {
    const { sourceCode, languageName } = req.body
    const compiler = new Compiler(compilerTypes[languageName])
    
    compiler
        .submit(sourceCode)
        .then((response) => {
            res.status(200)
            res.send(response)
        })
})

app.listen(process.env.PORT)

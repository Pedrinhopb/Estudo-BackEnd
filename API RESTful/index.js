// config inicial

const express = require('express')
const mongoose = require('mongoose')
const app = express()
const router = require('express').Router()


// forma de ler JSON
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

// rotas da API

const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)

// rota inicial
app.get('/', (req,res) => {
    res.json({message: 'Oi express!'})
})

// entregar uma porta
mongoose
    .connect(
        ''
    )
    .then(() => {
        console.log("Conectamos ao MongoDB!")
        app.listen(3000)
    })
    .catch((err) => console.log(err))


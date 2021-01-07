const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json());

app.get('/alimento', (req, res) => {
    res.status(200).json([
        { numero: 0, nombre: "Soja" },
        { numero: 1, nombre: "Pollo" },
        { numero: 1, nombre: "Pescado" },
    ])
})

app.get('/unidades', (req, res) => {
    res.status(200).json([
        { id: 0, nombre: "mg" },
        { id: 1, nombre: "g" },
        { id: 2, nombre: "kg" },
    ])
})

app.post('/receta', (req, res) => {
    console.log(req.body)
    res.status(200).send("OK")
})

app.listen(5000)
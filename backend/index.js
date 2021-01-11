const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const alimentos = [
    { numero: 0, nombre: "Soja" },
    { numero: 1, nombre: "Pollo" },
    { numero: 2, nombre: "Pescado" },
    { numero: 3, nombre: "Carne" },
    { numero: 4, nombre: "Arroz" },

]

const unidades = [
    { id: 0, nombre: "mg" },
    { id: 1, nombre: "g" },
    { id: 2, nombre: "kg" },
    { id: 3, nombre: "taza" },
]

const recetas = [
    {
        idReceta: 0,
        nombre: "Guiso de carne",
        descripcion: "Guiso de arroz y carne, que miseria",
        ingredientes: [
            {
                idIngrediente: 0,
                alimento: alimentos[3],
                cantidad: 500,
                unidadDeMedida: unidades[1]
            },
            {
                idIngrediente: 1,
                alimento: alimentos[4],
                cantidad: 1,
                unidadDeMedida: unidades[3]
            }
        ]
    },
    {
        idReceta: 2,
        nombre: "Guiso de pollo y pescado",
        descripcion: "Guiso de arroz, pollo y pescado, medio raro",
        ingredientes: [
            {
                idIngrediente: 2,
                alimento: alimentos[1],
                cantidad: 250,
                unidadDeMedida: unidades[1]
            },
            {
                idIngrediente: 2,
                alimento: alimentos[2],
                cantidad: 250,
                unidadDeMedida: unidades[1]
            },
            {
                idIngrediente: 3,
                alimento: alimentos[4],
                cantidad: 1,
                unidadDeMedida: unidades[3]
            }
        ]
    },
]

app.use(bodyParser.json());

app.get('/alimento', (req, res) => {
    res.status(200).json(alimentos)
})

app.get('/receta', (req, res) => {
    res.status(200).json(recetas)
})

app.get('/unidades', (req, res) => {
    res.status(200).json(unidades)
})

app.post('/receta', (req, res) => {
    console.log("crear", req.body)
    res.status(200).send("OK")
})

app.post('/receta/modificar', (req, res) => {
    console.log("modificar", req.body)
    res.status(200).send("OK")
})

app.listen(5000, () => {console.log("Conectado en el puerto 5000")})
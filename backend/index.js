const express = require('express')
const app = express()
const bodyParser = require('body-parser')

let alimentos = [
    { numero: 0, nombre: "Soja", esAccesible: true },
    { numero: 1, nombre: "Pollo", esAccesible: true },
    { numero: 2, nombre: "Pescado", esAccesible: true },
    { numero: 3, nombre: "Carne", esAccesible: true },
    { numero: 4, nombre: "Arroz", esAccesible: true },

]

const unidades = [
    { id: 0, nombre: "mg" },
    { id: 1, nombre: "g" },
    { id: 2, nombre: "kg" },
    { id: 3, nombre: "taza" },
]

let recetas = [
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
        idReceta: 1,
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


app.get('/unidades', (req, res) => {
    res.status(200).json(unidades)
})



app.get('/alimento', (req, res) => {
    res.status(200).json(alimentos)
})

app.post('/alimento', (req, res) => {
    console.log("modificar", req.body)
    alimentos = alimentos.filter(alimento => alimento.numero != req.body.numero)
    alimentos.push(req.body)
    alimentos.sort((a, b) => a.numero - b.numero)
    res.status(200).send("OK")
})



app.get('/receta', (req, res) => {
    res.status(200).json(recetas)
})

app.post('/receta', (req, res) => {
    console.log("crear", req.body)
    recetas.push(req.body)
    res.status(200).send("OK")
})

app.post('/receta/modificar', (req, res) => {
    console.log("modificar", req.body)
    recetas = recetas.filter(receta => receta.idReceta != req.body.idReceta)
    recetas.push(req.body)
    recetas.sort((a,b) => a.idReceta - b.idReceta)
    res.status(200).send("OK")
})


app.listen(8080, () => {console.log("Conectado en el puerto 8080")})
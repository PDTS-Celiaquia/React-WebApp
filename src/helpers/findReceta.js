export function findRecetaById(recetas, idReceta) {
    for (let receta of recetas) {
        if (receta.idReceta === parseInt(idReceta)) return receta
    }
    return null
}
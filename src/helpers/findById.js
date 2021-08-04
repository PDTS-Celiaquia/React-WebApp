export function findById(collection, id) {
    id = parseInt(id)
    for (let element of collection) {
        if (element.id === id) return element
    }
    return null
}
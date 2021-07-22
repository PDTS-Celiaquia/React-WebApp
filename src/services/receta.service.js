import axiosInstance from "./axiosInstance";

export async function findRecetaById(id) {
    return axiosInstance.get(`/api/receta/${id}`)
}

export async function getAllRecetas() {
    return axiosInstance.get('/api/receta')
}

export async function saveReceta(receta) {
    return axiosInstance.put('/api/receta/', receta)
}
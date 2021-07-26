import axiosInstance from "./axiosInstance";

export async function getAllAlimentos() {
    return axiosInstance.get('/api/alimento');
}

export async function setAlimentoAccesible(alimentoId, esAccesible) {
    return axiosInstance.patch(`/api/alimento/${alimentoId}/accesible`, { esAccesible });
}

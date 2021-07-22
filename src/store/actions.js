import axiosInstance from '../services/axiosInstance';
import { getAllRecetas, deleteRecetaById } from "../services/receta.service";

export const typeDefs = {
    requestUnidades: "REQUEST_UNIDADES",
    successUnidades: "SUCCESS_UNIDADES",
    errorUnidades: "ERROR_UNIDADES",

    requestAlimentos: "REQUEST_ALIMENTOS",
    successAlimentos: "SUCCESS_ALIMENTOS",
    errorAlimentos: "ERROR_ALIMENTOS",

    requestSendAlimento: "REQUEST_SEND_ALIMENTO",
    successSendAlimento: "SUCCESS_SEND_ALIMENTO",
    errorSendAlimento: "ERROR_SEND_ALIMENTO",

    requestRecetas: "REQUEST_RECETAS",
    successRecetas: "SUCCESS_RECETAS",
    errorRecetas: "ERROR_RECETAS",

    requestDeleteRecetas: "REQUEST_DELETE_RECETAS",
    successDeleteRecetas: "SUCCESS_DELETE_RECETAS",
    errorDeleteRecetas: "ERROR_DELETE_RECETAS",
}

const {
    requestUnidades, successUnidades, errorUnidades,
    requestAlimentos, successAlimentos, errorAlimentos,
    requestSendAlimento, successSendAlimento, errorSendAlimento,
    requestRecetas, successRecetas, errorRecetas,
    requestDeleteRecetas, successDeleteRecetas, errorDeleteRecetas
} = typeDefs


export function getUnidades() {
    return dispatch => {
        dispatch({ type: requestUnidades })
        axiosInstance.get('/api/unidades').then(
            response => dispatch({ type: successUnidades, payload: response.data }),
            error => dispatch({ type: errorUnidades, error })
        )
    }
}

export function getAlimentos() {
    return dispatch => {
        dispatch({ type: requestAlimentos })
        axiosInstance.get('/api/alimento').then(
            response => dispatch({ type: successAlimentos, payload: response.data }),
            error => dispatch({ type: errorAlimentos, error })
        )
    }
}

export function sendAlimento(alimento, index) {
    return dispatch => {
        dispatch({ type: requestSendAlimento, payload: { alimento, index } })
        axiosInstance.post('/api/alimento/', alimento).then(
            () => dispatch({ type: successSendAlimento }),
            error => dispatch({ type: errorSendAlimento, error })
        )
    }
}


export function getRecetas() {
    return dispatch => {
        dispatch({ type: requestRecetas })
        getAllRecetas().then(
            response => dispatch({ type: successRecetas, payload: response.data }),
            error => dispatch({ type: errorRecetas, error })
        )
    }
}

export function deleteReceta(id) {
    return dispatch => {
        dispatch({ type: requestDeleteRecetas })
        deleteRecetaById(id).then(
            () => dispatch({ type: successDeleteRecetas, payload: { id } }),
            error => dispatch({ type: errorDeleteRecetas, error })
        )
    }
}


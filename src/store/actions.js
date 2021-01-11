import axiosInstance from '../axiosInstance'

export const typeDefs = {
    requestAlimentos: "REQUEST_ALIMENTOS",
    successAlimentos: "SUCCESS_ALIMENTOS",
    errorAlimentos: "ERROR_ALIMENTOS",

    requestRecetas: "REQUEST_RECETAS",
    successRecetas: "SUCCESS_RECETAS",
    errorRecetas: "ERROR_RECETAS",

    requestUnidades: "REQUEST_UNIDADES",
    successUnidades: "SUCCESS_UNIDADES",
    errorUnidades: "ERROR_UNIDADES",

    requestSendReceta: "REQUEST_SEND_RECETA",
    successSendReceta: "SUCCESS_SEND_RECETA",
    errorSendReceta: "ERROR_SEND_RECETA",
}

const {
    requestAlimentos, successAlimentos, errorAlimentos,
    requestRecetas, successRecetas, errorRecetas,
    requestUnidades, successUnidades, errorUnidades,
    requestSendReceta, successSendReceta, errorSendReceta,
} = typeDefs

export function getAlimentos() {
    return dispatch => {
        dispatch({ type: requestAlimentos })
        axiosInstance.get('/alimento').then(
            response => dispatch({ type: successAlimentos, payload: response }),
            error => dispatch({ type: errorAlimentos, error })
        )
    }
}

export function getRecetas() {
    return dispatch => {
        dispatch({ type: requestRecetas })
        axiosInstance.get('/receta').then(
            response => dispatch({ type: successRecetas, payload: response }),
            error => dispatch({ type: errorRecetas, error })
        )
    }
}

export function getUnidades() {
    return dispatch => {
        dispatch({ type: requestUnidades })
        axiosInstance.get('/unidades').then(
            response => dispatch({ type: successUnidades, payload: response }),
            error => dispatch({ type: errorUnidades, error })
        )
    }
}

export function sendReceta(receta) {
    return dispatch => {
        dispatch({ type: requestSendReceta })
        const route = `/receta${typeof receta.idReceta !== "undefined" ? '/modificar': ''}`
        // si la receta tiene id es una modificación
        axiosInstance.post(route, receta).then(
            () => dispatch({ type: successSendReceta }),
            error => dispatch({ type: errorSendReceta, error })
        )
    }
}
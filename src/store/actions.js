import axiosInstance from '../axiosInstance'

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

    requestSendReceta: "REQUEST_SEND_RECETA",
    successSendReceta: "SUCCESS_SEND_RECETA",
    errorSendReceta: "ERROR_SEND_RECETA",
}

const {
    requestUnidades, successUnidades, errorUnidades,
    requestAlimentos, successAlimentos, errorAlimentos,
    requestSendAlimento, successSendAlimento, errorSendAlimento,
    requestRecetas, successRecetas, errorRecetas,
    requestSendReceta, successSendReceta, errorSendReceta,
} = typeDefs


export function getUnidades() {
    return dispatch => {
        dispatch({ type: requestUnidades })
        axiosInstance.get('/unidades').then(
            response => dispatch({ type: successUnidades, payload: response }),
            error => dispatch({ type: errorUnidades, error })
        )
    }
}


export function getAlimentos() {
    return dispatch => {
        dispatch({ type: requestAlimentos })
        axiosInstance.get('/alimento').then(
            response => dispatch({ type: successAlimentos, payload: response }),
            error => dispatch({ type: errorAlimentos, error })
        )
    }
}

export function sendAlimento(alimento, index) {
    return dispatch => {
        dispatch({ type: requestSendAlimento, payload: { alimento, index } })
        axiosInstance.post('/alimento', alimento).then(
            () => dispatch({ type: successSendAlimento }),
            error => dispatch({ type: errorSendAlimento })
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

export function sendReceta(receta) {
    return dispatch => {
        dispatch({ type: requestSendReceta })
        const route = `/receta${typeof receta.idReceta !== "undefined" ? '/modificar' : ''}`
        // si la receta tiene id es una modificación
        axiosInstance.post(route, receta).then(
            () => dispatch({ type: successSendReceta }),
            error => dispatch({ type: errorSendReceta, error })
        )
    }
}

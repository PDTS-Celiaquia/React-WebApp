import axiosInstance from '../axiosInstance'

export const typeDefs = {
    requestAlimentos: "REQUEST_ALIMENTOS",
    successAlimentos: "SUCCESS_ALIMENTOS",
    errorAlimentos: "ERROR_ALIMENTOS",

    requestUnidades: "REQUEST_UNIDADES",
    successUnidades: "SUCCESS_UNIDADES",
    errorUnidades: "ERROR_UNIDADES",
}

const {
    requestAlimentos, successAlimentos, errorAlimentos,
    requestUnidades, successUnidades, errorUnidades,
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

export function getUnidades() {
    return dispatch => {
        dispatch({ type: requestUnidades })
        axiosInstance.get('/unidades').then(
            response => dispatch({ type: successUnidades, payload: response }),
            error => dispatch({ type: errorUnidades, error })
        )
    }
}
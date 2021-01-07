import { typeDefs } from './actions';

const {
    requestAlimentos, successAlimentos, errorAlimentos,
    requestUnidades, successUnidades, errorUnidades,
    requestSendReceta, successSendReceta, errorSendReceta,
} = typeDefs

const initState = {
    alimentos: null,
    fetchingAlimentos: false,
    errorAlimentos: false,
    
    unidadesDeMedida: null,
    fetchingUnidades: false,
    errorUnidades: false,

    sendingReceta: false,
    errorReceta: false,
}

export default function reducer(state = initState, { type, payload, error }) {
    switch (type) {

        case requestAlimentos:
            return { ...state, fetchingAlimentos: true, errorAlimentjos: false }

        case successAlimentos:
            return { ...state, fetchingAlimentos: false, alimentos: payload }

        case errorAlimentos:
            return { ...state, fetchingAlimentos: false, errorAlimentos: true, message: error }

        case requestUnidades:
            return { ...state, fetchingUnidades: true, errorUnidades: false }

        case successUnidades:
            return { ...state, fetchingUnidades: false, unidadesDeMedida: payload }

        case errorUnidades:
            return { ...state, fetchingUnidades: false, errorUnidades: true, message: error }

        case requestSendReceta:
            return { ...state, sendingReceta: true, errorReceta: false }

        case successSendReceta:
            return { ...state, sendingReceta: false }

        case errorSendReceta:
            return { ...state, sendingReceta: false, errorReceta: true, message: error }

        default:
            return state
    }
}

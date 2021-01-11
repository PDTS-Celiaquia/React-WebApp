import { typeDefs } from './actions';

const {
    requestAlimentos, successAlimentos, errorAlimentos,
    requestRecetas, successRecetas, errorRecetas,
    requestUnidades, successUnidades, errorUnidades,
    requestSendReceta, successSendReceta, errorSendReceta,
} = typeDefs

const initState = {
    alimentos: null,
    fetchingAlimentos: false,
    errorAlimentos: false,

    recetas: null,
    fetchingRecetas: false,
    errorRecetas: false,

    unidadesDeMedida: null,
    fetchingUnidades: false,
    errorUnidades: false,

    sendingReceta: false,
    errorSendReceta: false,
}

export default function reducer(state = initState, { type, payload, error }) {
    switch (type) {

        case requestAlimentos:
            return { ...state, fetchingAlimentos: true, errorAlimentos: false }

        case successAlimentos:
            return { ...state, fetchingAlimentos: false, alimentos: payload }

        case errorAlimentos:
            return { ...state, fetchingAlimentos: false, errorAlimentos: true, message: error }


        case requestRecetas:
            return { ...state, fetchingRecetas: true, errorRecetas: false }

        case successRecetas:
            return { ...state, fetchingRecetas: false, recetas: payload }

        case errorRecetas:
            return { ...state, fetchingRecetas: false, errorRecetas: true, message: error }


        case requestUnidades:
            return { ...state, fetchingUnidades: true, errorUnidades: false }

        case successUnidades:
            return { ...state, fetchingUnidades: false, unidadesDeMedida: payload }

        case errorUnidades:
            return { ...state, fetchingUnidades: false, errorUnidades: true, message: error }


        case requestSendReceta:
            return { ...state, sendingReceta: true, errorSendReceta: false }

        case successSendReceta:
            return { ...state, sendingReceta: false }

        case errorSendReceta:
            return { ...state, sendingReceta: false, errorSendReceta: true, message: error }

        default:
            return state
    }
}

import { typeDefs } from './actions';

const {
    requestAlimentos, successAlimentos, errorAlimentos,
    requestUnidades, successUnidades, errorUnidades,
} = typeDefs

const initState = {
    alimentos: null,
    unidadesDeMedida: null,
    fetchingAlimentos: false,
    fetchingUnidades: false,
    errorAlimentos: false,
    errorUnidades: false,
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

        default:
            return state
    }
}

import {createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from "./reducer";

export default function getStore() {
    return createStore(reducer, applyMiddleware(thunk))
}
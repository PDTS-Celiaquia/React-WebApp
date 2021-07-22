import React from 'react'
import { Provider } from 'react-redux'
import MainRouter from './router/MainRouter'
import getStore from './store'

function App() {
    return (
        <Provider store={getStore()}>
            <MainRouter />
        </Provider>
    )
}

export default App

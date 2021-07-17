import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import reportWebVitals from './reportWebVitals';
import MainRouter from './router/MainRouter';
import getStore from './store'

// if in production do not log debug messages
if (process.env.NODE_ENV === "production") {
  console.debug = () => { }
}

ReactDOM.render(
    <Provider store={getStore()}>
      <MainRouter />
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

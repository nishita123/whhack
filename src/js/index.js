// this makes sure we have es6 polyfill's like Promise
import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Header from './Header'
import MovieListContainer from './MovieListContainer'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { rootReducer } from './reducers'

var store = createStore(rootReducer, applyMiddleware(thunk))

var main = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App>
        <Header/>
        <MovieListContainer/>
      </App>
    </Provider>,
    document.getElementById('main')
  );
}

window.mystore = store

document.addEventListener('DOMContentLoaded', main);

import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { loadState, saveState } from './utilities/persistance';
import throttle from 'lodash/throttle';
import Thunk from 'redux-thunk';

import fb from './utilities/firebase-mock';
import rootReducer from './reducers/root';
import Application from './main';

const Logger = createLogger({ collapsed: true });
const enhancer = composeWithDevTools(applyMiddleware(Thunk, Logger));
const initialState = loadState();
const store = createStore(rootReducer, initialState, enhancer);
store.subscribe(
  throttle(() => {
    const state = store.getState();

    saveState(state);
  }, 1000)
);

if (typeof firebase === 'undefined') {
  window.firebase = fb;
}

render(
  <Provider store={store}>
    <Application />
  </Provider>,
  document.getElementById('application')
);

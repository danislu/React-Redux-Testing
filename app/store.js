import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger'
import persistState from 'redux-localstorage';

import app from './reducers';
import { LOCAL_STORAGE_KEY, initalState } from './constants';

const loggerMiddleware = createLogger();

const composedStore = compose(
    applyMiddleware(thunk, loggerMiddleware),
    persistState([], {
        key: LOCAL_STORAGE_KEY
    })
)(createStore);

const store = composedStore(app, initalState);

export default store;
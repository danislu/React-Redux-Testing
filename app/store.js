import { compose, createStore } from 'redux';
import persistState from 'redux-localstorage';

import app from './reducers';
import { LOCAL_STORAGE_KEY, initalState } from './constants';

const createPersistentStore = compose(
    persistState([], {
        key: LOCAL_STORAGE_KEY
    })
)(createStore);

const store = createPersistentStore(app, initalState);

export default store;
import {createStore, combineReducers} from 'redux';
import network from './modules/network/reducer';

const reducers = combineReducers({
    network
});

const store = createStore(reducers);

export default store;
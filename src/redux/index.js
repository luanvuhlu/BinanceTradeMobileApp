import {applyMiddleware, createStore, combineReducers} from 'redux';
import network from './modules/network/reducer';
import coins from './modules/coins/reducer';
import {loadCoins} from './modules/coins/actions';
import {persistStore, persistCombineReducers} from 'redux-persist';
import {AsyncStorage} from 'react-native';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage' // default: localStorage if web, AsyncStorage if react-native

const config = {
    key: 'root',
    storage,
}

const reducers = persistCombineReducers(config, {
    network,
    coins,
});


const createAppStore = applyMiddleware(thunk)(createStore);
const store = createAppStore(reducers);

persistStore(store);

export default store;

store.dispatch(loadCoins());
const unsubscribe = store.subscribe(() => {
    // console.log(store.getState());
})
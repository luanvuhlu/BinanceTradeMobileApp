import {
    ADD_FAVORITE,
    LOAD_COINS,
    REMOVE_FAVORITE,
    LOADING_COIN,
    SELECTED_COIN,
} from './actions';

const initialState = {
    coins: [],
    favorites: [],
    isCoinLoading: false,
    selectedCoin: null
}

export default function reducer(state = initialState, action){
    switch(action.type){
        case LOAD_COINS:
            console.log('Afterv reload');
            return {
                ...state,
                coins: action.payload,
                favorites: action.payload.filter(coin => state.favorites.some(fCoin => fCoin.symbol === coin.symbol)),
                isCoinLoading: false
            };
        case LOADING_COIN:
            return {
                ...state,
                isCoinLoading: action.payload
            }
        case ADD_FAVORITE:
            return {
                ...state,
                favorites: [action.payload, ...state.favorites]
            };
        case REMOVE_FAVORITE:
            return {
                ...state,
                favorites: state.favorites.filter(f => f.symbol !== action.payload.symbol),
            }
        case SELECTED_COIN:
            return {
                ...state,
                selectedCoin: action.payload
            }
        default:
            return state;
    }
}
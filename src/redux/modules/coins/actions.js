import binanceServices from '../../../binanceApi/config';

export const LOAD_COINS = 'coin/load';
export const ADD_FAVORITE = 'coin/add_favorite';
export const REMOVE_FAVORITE = 'coin/remove_favorite';
export const LOADING_COIN = 'coin/loading';
export const SELECTED_COIN = 'coin/selected';

export const selectCoin = coin => ({
    type: SELECTED_COIN,
    payload: coin
});

export const loadingCoin = () => ({
    type: LOADING_COIN,
    payload: true
});

const reloadCoins = coins => ({
    type: LOAD_COINS,
    payload: coins
});

export const addFavorite = coin => ({
    type: ADD_FAVORITE,
    payload: coin
});

export const removeFavorite = coin => ({
    type: REMOVE_FAVORITE,
    payload: coin,
});

export const loadCoins = () => dispatch => {
    dispatch(loadingCoin());
    binanceServices.allPricesTickers().then((tickers) => {
        console.log('Loading');

        dispatch(reloadCoins(tickers));
    }).catch((error) => {
        console.error(error);
    })
};


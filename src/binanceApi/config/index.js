import Services from 'binancesdk';

let binanceServices = new Services({
    endPointUrl: 'https://www.binance.com/api/',
});

export default binanceServices;
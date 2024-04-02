
import { apiCredentials } from "./apiCredentials";


export const stockData = {


    fullQuote: (ticker, callback) => {
        const url = `${apiCredentials.baseURL}/v3/quote/${ticker}?apikey=${apiCredentials.apiKey}`;
        fetch(url).then((res) => res.json())
        .then((data) => callback(data));

        console.log('fetched full quote')
    },

    bulkCompanyPrices: (tickers, callback) => {
        const url = `${apiCredentials.baseURL}/v3/quote/${tickers}?apikey=${apiCredentials.apiKey}`;
        fetch(url).then((res) => res.json())
        .then((data) => callback(data));

        console.log('fetched bulk company prices')
    },





}
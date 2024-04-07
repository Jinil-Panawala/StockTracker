
import { apiCredentials } from "./apiCredentials";


export const stockData = {

    // Called when displaying stock panel. Same data as fullQuote, except we can have multiple stocks here
    bulkCompanyPrices: (tickers, callback) => {
        const url = `${apiCredentials.baseURL}/v3/quote/${tickers}?apikey=${apiCredentials.apiKey}`;
        fetch(url).then((res) => res.json())
        .then((data) => callback(data));

        console.log('fetched bulk company prices')
    },

    // Called when updating stock card and graph
    fullQuote: (ticker, callback) => {
        const url = `${apiCredentials.baseURL}/v3/quote/${ticker}?apikey=${apiCredentials.apiKey}`;
        fetch(url).then((res) => res.json())
        .then((data) => callback(data));

        console.log('fetched full quote')
    },

    // Called when updating stock card and graph
    companyProfile: (ticker, callback) => {
        const url = `${apiCredentials.baseURL}/v3/profile/${ticker}?apikey=${apiCredentials.apiKey}`;
        fetch(url).then((res) => res.json())
        .then((data) => callback(data));

        console.log('fetched company profile')
    },

    daily5min: (ticker, callback) => {

        const url = `${apiCredentials.baseURL}/v3/historical-chart/5min/${ticker}?from=2024-03-28&to=2024-03-28&apikey=${apiCredentials.apiKey}`;
        fetch(url).then((res) => res.json())
        .then((data) => callback(data));

        console.log('fetched daily 5 min data');

    }

    // daily 5 min chart:
    // If day is weekend or holiday, api returns empty array. So, refetch by going back 1 day until non-empty array is returned. 
    //https://financialmodelingprep.com/api/v3/historical-chart/5min/AAPL?from=2024-03-28&to=2024-03-28&apikey=DCdyLxaoqzFVHKmZAuBSsxtthy5oIFwA




}
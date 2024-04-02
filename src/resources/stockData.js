

// const apiKey = 'pj2H8cI8ogAOrzQsmmPgTmrAZWHuSzOe';
const apiKey = 'mzWi9yFMG3gUMfxxvfKmFAAMl1xKyrCg'
const baseURL = 'https://financialmodelingprep.com/api';

export const stockData = {


    fullQuote: (ticker, callback) => {
        const url = `${baseURL}/v3/quote/${ticker}?apikey=${apiKey}`;
        fetch(url).then((res) => res.json())
        .then((data) => callback(data));
        
        console.log('fetched full quote')
    },

    bulkCompanyPrices: (tickers, callback) => {
        const url = `${baseURL}/v3/quote/${tickers}?apikey=${apiKey}`;
        fetch(url).then((res) => res.json())
        .then((data) => callback(data));

        console.log('fetched bulk company prices')
    },


}
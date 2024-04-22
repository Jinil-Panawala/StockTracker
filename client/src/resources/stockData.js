
const keys = process.env.REACT_APP_API_KEYS.split(',');
const randomIndex = Math.floor(Math.random() * keys.length);
const selectedKey = keys[randomIndex];
const baseUrl = process.env.REACT_APP_FMP_BASE_URL;
export const stockData = {

    // Called when displaying stock panel. Same data as fullQuote, except we can have multiple stocks here
    bulkCompanyPrices: (tickers, callback) => {
        const url = `${baseUrl}/v3/quote/${tickers}?apikey=${selectedKey}`;
        fetch(url).then((res) => res.json())
        .then((data) => callback(data));

        // console.log('fetched bulk company prices')
    },

    // Called when updating stock card and graph
    fullQuote: (ticker, callback) => {
        const url = `${baseUrl}/v3/quote/${ticker}?apikey=${selectedKey}`;
        fetch(url).then((res) => res.json())
        .then((data) => callback(data));

        // console.log('fetched full quote');
    },

    // Called when updating stock card and graph
    companyProfile: (ticker, callback) => {
        const url = `${baseUrl}/v3/profile/${ticker}?apikey=${selectedKey}`;
        fetch(url).then((res) => res.json())
        .then((data) => callback(data));

        // console.log('fetched company profile', ticker);
    },

    // Called when creating 1D graph
    daily1min: (ticker, date, callback) => {

        const url = `${baseUrl}/v3/historical-chart/1min/${ticker}?from=${date}&to=${date}&apikey=${selectedKey}`;
        fetch(url).then((res) => res.json())
        .then((data) => callback(data));

        // console.log('fetched daily 1 min data');

    },

    // Called when creating 1W graph
    weekly5min: (ticker, datefrom, dateTo, callback) => {

        const url = `${baseUrl}/v3/historical-chart/5min/${ticker}?from=${datefrom}&to=${dateTo}&apikey=${selectedKey}`;
        fetch(url).then((res) => res.json())
        .then((data) => callback(data));

        // console.log('fetched weekly 5 min data');

    },

    // Called when creating 1W graph
    monthly15min: (ticker, datefrom, dateTo, callback) => {

        const url = `${baseUrl}/v3/historical-chart/15min/${ticker}?from=${datefrom}&to=${dateTo}&apikey=${selectedKey}`;
        fetch(url).then((res) => res.json())
        .then((data) => callback(data));

        // console.log('fetched monthly 15 min data');

    },

    yearly: (ticker, datefrom, dateTo, callback) => {
        const url = `${baseUrl}/v3/historical-price-full/${ticker}?from=${datefrom}&to=${dateTo}&apikey=${selectedKey}`;
        fetch(url).then((res) => res.json())
        .then((data) => callback(data));

        // console.log('fetched 1 year data');
    },
    
    fiveYears: (ticker, callback) => {
        const url = `${baseUrl}/v3/historical-price-full/${ticker}?apikey=${selectedKey}`;
        fetch(url).then((res) => res.json())
        .then((data) => callback(data));

        // console.log('fetched 5 years data');
    },







}
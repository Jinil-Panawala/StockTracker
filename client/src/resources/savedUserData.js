
const isProduction = (process.env.REACT_APP_MODE === 'prod'); // Change in .env file
const port = process.env.REACT_APP_PORT || 8000;
const clientURL = process.env.REACT_APP_CLIENT_URL;

const _id = '661c9b149946b8f65dcf3748'; // Currently the id of the only document in db. 

export const userData = {


    getUserData: async (callback) => {

        const url = (isProduction ? `${clientURL}/api/users`: `http://localhost:${port}/api/users`);
        fetch(url).then((res) => res.json())
        .then((data) => {callback(data)})
        .catch(error => {
            console.error('Error:', error);
        });

        // console.log('fetched user stock data from db');
    },

    updateSavedStocks: (stockArrayObject, callback) => {
        const url = (isProduction ? `${clientURL}/api/users/${_id}` : `http://localhost:${port}/api/users/${_id}` );

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(stockArrayObject),
            })
            
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Unable to update the Database');
                }

                return response.json();
            })
            .then(data => {
                callback(stockArrayObject); 
            })
            .catch(error => {
                console.error('Error:', error);
        });
    }



}
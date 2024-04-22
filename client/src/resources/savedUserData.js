
const port = process.env.REACT_APP_PORT || 8000;
const _id = '661c9b149946b8f65dcf3748'; // Currently the id of the only document in db. 

export const userData = {


    getUserData: async (callback) => {

        const url = `http://localhost:${port}/api/users`
        fetch(url).then((res) => res.json())
        .then((data) => {callback(data)})
        .catch(error => {
            console.error('Error:', error);
        });

        // console.log('fetched user stock data from db');
    },

    updateSavedStocks: (stockArrayObject, callback) => {
        const url = `http://localhost:${port}/api/users/${_id}`;

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
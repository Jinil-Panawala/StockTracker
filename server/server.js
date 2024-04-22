const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config();
const path = require('path')
const connectDB = require('./db.js');
const routes = require('./routes/api/users')

app.use(express.json());
app.use(cors({
    origin: '*',
}));


/// Important to run frontend via backend server
const buildPath = path.join(__dirname , "../client/build");
app.use(express.static(buildPath));
///


// use the routes module as a middleware
// for the /api/users path. 
app.use('/api/users', routes);


/// Important to run frontend via backend server
// To run the react app on the server port instead of the usual port 3000. 
app.get("*", function(req, res) {
    res.sendFile(
        path.join(__dirname, "../client/build/index.html"),
        function (err) {
            if (err) {
                res.status(500).send(err);
            }
        }
    );
})
///


// Conenct database
connectDB();




const port = process.env.PORT || 8000;
app.listen(port, () => {
    
        console.log(`server start on port ${port}`);

    }   

)
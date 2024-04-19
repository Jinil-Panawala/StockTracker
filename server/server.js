const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./db.js');
const routes = require('./routes/api/users')

app.use(express.json());
app.use(cors());

// Conenct database
connectDB();

// use the routes module as a middleware
// for the /api/users path. 
app.use('/api/users', routes)


const port = process.env.PORT || 4000;
app.listen(port, () => {
    
        console.log(`server start on port ${port}`);

    }   

)
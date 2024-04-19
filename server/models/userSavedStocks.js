const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');



const userSavedStocks = new mongoose.Schema({
    _id: ObjectId,
    userName: String,
    savedStocks: Array,
}, {collection: 'userSavedStocks'}); // collection added since userSavedStocks already existed in my db. 

module.exports = User =  mongoose.model('userSavedStocks', userSavedStocks );


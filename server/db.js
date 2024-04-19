const mongoose = require('mongoose');

const cluster = 'stockwatchlistcluster';
const db = 'savedStocks';

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(`mongodb+srv://jinilpanawala:Jinil2004@${cluster}.ekd6io8.mongodb.net/${db}?retryWrites=true&w=majority&appName=StockWatchlistCluster`);
        console.log(`MongoDB Connected: ${connection.connection.host}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

module.exports = connectDB;
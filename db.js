const mongoose = require('mongoose');
require('dotenv').config();

//Define the MongoDB connection URL
const DB_URL = process.env.MONGODB_URL;
// const mongoURL = 'mongodb://127.0.0.1:27017/hotels'; //Replace 'mydatabase' with your database name
// const mongoURL = MONGODB_URL_LOCAL;
const mongoURL = DB_URL;

//Set up MongoDB connection
mongoose.connect(mongoURL)


//Get the default connection
//Mongoose maintains a default connection object representing the MongoDB connection.
const db = mongoose.connection;


//Define Event Listeners for database connection
db.on('connected',()=>{
    console.log("Connected to MongoDB Server")
})
db.on('error',(err)=>{
    console.error("MongoDB connection error: ", err);
})
db.on('disconnected',()=>{
    console.log("MongoDB Disconnected")
})


module.exports = db;
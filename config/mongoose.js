const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/URL_Shortner');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to DataBase'));
db.once('open',()=>{
    console.log("Connection to DB successfull");
});

module.exports = db;
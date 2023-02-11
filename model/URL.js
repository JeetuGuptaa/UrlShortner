const mongoose = require('mongoose');
const URLschema = new mongoose.Schema({
    url : {
        type : String,
        required : true
    },
    short_url : {
        type : String,
        required : true
    }, 
    click : {
        type : Number,
        default : 0
    }
},
{
    timestamps : true
});

const ShortUrl = mongoose.model('URL', URLschema);
module.exports = ShortUrl;
const mongoose = require('mongoose')
mongoose.Connect
mongoose.Promise = global.Promise;
const slug = require('slugs');

const storeSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: 'Please enter the store name!'
    },
    slug: String,
    description:{
        type:String,
        trim:true
    },
    tags:[String]
    
});

module.exports = mongoose.model('Store', storeSchema);
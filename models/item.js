/*
 * Ryan DiRezze
 * Taborek Treasures
 */

var mongoose = require('mongoose');
// var bcrypt = require('bcryptjs');   // for hashing passwords

mongoose.set('useCreateIndex', true);

/* setup per the YouTube video: https://www.youtube.com/watch?v=OnuC3VtEQks */
// User Schema
var ItemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: false
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String
    }
});

// create a variable that can be accessed outside of this file
var Item = module.exports = mongoose.model('Item', ItemSchema);

// User function to create a new Item within the DB
module.exports.createItem = function(newItem, callback) {
    newItem.save(callback);
}

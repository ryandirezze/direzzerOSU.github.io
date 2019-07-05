var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');   // for hashing passwords

mongoose.set('useCreateIndex', true);

/* setup per the YouTube video: https://www.youtube.com/watch?v=OnuC3VtEQks */
// User Schema
var UserSchema = mongoose.Schema({
    username: {
        type: String,
        unique:true
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    name: {
        type: String
    },
    role: {
        type: String
    }
});

// create a variable that can be accessed outside of this file
var User = module.exports = mongoose.model('User', UserSchema);

// User functions
module.exports.createUser = function(newUser, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

// Passport function to check that the login input's username exists within the database and is valid / matches (between user input & DB)
module.exports.getUserByUsername = function(username, callback) {
    var query = {username: username};
    User.findOne(query, callback);
}

// Passport function to check that the login input's username exists within the database and is valid / matches (between user input & DB)
module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

// Passport function to verify the password (of a valid / existing username) matches between the user's input & the database
module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if(err) throw err;
        callback(null, isMatch);
    });
}
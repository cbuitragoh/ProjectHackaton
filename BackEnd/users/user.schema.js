var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    active: Boolean,
    name: String,
    phone: String,
    talent: String,
    tags: [],
    company: String,
    email: String,
    password: {
        type: String
    }
});


var User = mongoose.model('user', userSchema);

exports.User = User;
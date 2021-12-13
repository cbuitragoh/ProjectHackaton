var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    active: Boolean,
    name: String,
    phone: String,
    talent: String,
    tags: [],
    company: String,
    email: String,
    password: String
});


var User = mongoose.model('user', userSchema);

exports.User = User;

exports.createUser = async (user, session) => {
    user = {
        ...user, 
        tags: user.tags.split(","),
        active: true
    }

    return new User(user).save({session});
}
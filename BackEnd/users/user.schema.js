var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    active: Boolean,
    name: String,
    phone: String,
    talent: String,
    tags: [],
    company: String,
    email: String,
    password: String,
    profileUrl: String,
    description: String
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

exports.getUsersByTags = async (tags, session) => {
    const query = {
        active: true,
        talent: {$ne: null}
    }
    return await User.find(query).session(session);

    //return users.filter((user) => user.tags.filter((tag) => tags.includes(tag)).length);
}

exports.getUsersById = async (id, session) => {
    
    return User.findById(mongoose.Types.ObjectId(id)).session(session);
}

exports.updateUser = async (id, data, session) => {
    return User.findByIdAndUpdate(mongoose.Types.ObjectId(id), {$set: data}).session(session);
}


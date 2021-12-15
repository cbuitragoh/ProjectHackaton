var mongoose = require('mongoose');
const { createUser, getUsersByTags, getUsersById, updateUser } = require('./user.schema');

exports.register = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    var userData = req.body;
    
    try {
        var user = await createUser(userData, session);
        await session.commitTransaction();
        session.endSession();
        res.send(user);
    } catch (error) {
        console.log(error)
        session.abortTransaction();
        res.status(500).send(error.message || error);
    }
}

exports.getUsersByTags = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    var tags = req.params.tags;

    
    try {
        var users = await getUsersByTags(tags, session);
        await session.commitTransaction();
        session.endSession();
        res.send(users);
    } catch (error) {
        console.log(error)
        session.abortTransaction();
        res.status(500).send(error.message || error);
    }
}

exports.getUserById = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    var id = req.params.id;

    
    try {
        var user = await getUsersById(id, session);
        await session.commitTransaction();
        session.endSession();
        res.send(user);
    } catch (error) {
        console.log(error)
        session.abortTransaction();
        res.status(500).send(error.message || error);
    }
}

exports.updateUser = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    var id = req.params.id;
    var data = req.body

    
    try {
        var user = await updateUser(id, data, session);
        await session.commitTransaction();
        session.endSession();
        res.send(user);
    } catch (error) {
        console.log(error)
        session.abortTransaction();
        res.status(500).send(error.message || error);
    }
}
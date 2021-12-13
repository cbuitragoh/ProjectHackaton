var mongoose = require('mongoose');
const { createUser } = require('./user.schema');

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
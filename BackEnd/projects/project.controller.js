var mongoose = require('mongoose');
const { createProject, getProjects } = require('./project.schema');

exports.register = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    var userData = req.body;

    
    try {
        var user = await createProject(userData, session);
        await session.commitTransaction();
        session.endSession();
        res.send(user);
    } catch (error) {
        console.log(error)
        session.abortTransaction();
        res.status(500).send(error.message || error);
    }
}

exports.getProjects = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    var user = req.params.id;

    
    try {
        var projects = await getProjects(user, session);
        await session.commitTransaction();
        session.endSession();
        res.send(projects);
    } catch (error) {
        console.log(error)
        session.abortTransaction();
        res.status(500).send(error.message || error);
    }
}
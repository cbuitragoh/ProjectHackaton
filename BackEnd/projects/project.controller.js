var mongoose = require('mongoose');
const { createProject, getProjects, getProjectsByTalent, deleteProjects } = require('./project.schema');

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

exports.getProjectsByTalent = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    var talent = req.params.talent;

    
    try {
        var projects = await getProjectsByTalent(talent, session);
        await session.commitTransaction();
        session.endSession();
        res.send(projects);
    } catch (error) {
        console.log(error)
        session.abortTransaction();
        res.status(500).send(error.message || error);
    }
}

exports.deleteProjects = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    var user = req.params.id;

    
    try {
        var projects = await deleteProjects(user, session);
        await session.commitTransaction();
        session.endSession();
        res.status(200).send();
    } catch (error) {
        console.log(error)
        session.abortTransaction();
        res.status(500).send(error.message || error);
    }
}
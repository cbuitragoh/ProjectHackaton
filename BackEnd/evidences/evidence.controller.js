var mongoose = require('mongoose');
const { createEvidence, getEvidences } = require('./evidence.schema');

exports.register = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    var evidenceData = req.body;

    
    try {
        var evidence = await createEvidence(evidenceData, session);
        await session.commitTransaction();
        session.endSession();
        res.send(evidence);
    } catch (error) {
        console.log(error)
        session.abortTransaction();
        res.status(500).send(error.message || error);
    }
}

exports.getEvidences = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    var user = req.params.id;

    
    try {
        var evidences = await getEvidences(user, session);
        await session.commitTransaction();
        session.endSession();
        res.send(evidences);
    } catch (error) {
        console.log(error)
        session.abortTransaction();
        res.status(500).send(error.message || error);
    }
}


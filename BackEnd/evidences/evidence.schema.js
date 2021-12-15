var mongoose = require('mongoose');

var evidenceSchema = new mongoose.Schema({
    url: String,
    user: {type: mongoose.Types.ObjectId, ref: 'user'},
    type: String
});


var Evidence = mongoose.model('evidence', evidenceSchema);

exports.Evidence = Evidence;

exports.createEvidence = async (evidence, session) => {
    evidence = {
        ...evidence, 
        user: mongoose.Types.ObjectId(evidence.user),
    }

    return new Evidence(evidence).save({session});
}

exports.getEvidences = async (user, session) => {
   const query = {
        user: mongoose.Types.ObjectId(user)
   }

    return Evidence.find(query).session(session);
}

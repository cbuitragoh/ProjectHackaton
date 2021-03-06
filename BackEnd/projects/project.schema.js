var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
    active: Boolean,
    name: String,
    description: String,
    user: {type: mongoose.Types.ObjectId, ref: 'user'},
    profiles: []
});


var Project = mongoose.model('project', projectSchema);

exports.Project = Project;

exports.createProject = async (project, session) => {
    project = {
        ...project, 
        user: mongoose.Types.ObjectId(project.idGestor),
        active: true
    }

    return new Project(project).save({session});
}

exports.getProjects = async (user, session) => {
   const query = {
        user: mongoose.Types.ObjectId(user),
        active: true
   }

    return Project.find(query).session(session);
}

exports.getProjectsByTalent = async (talent, session) => {
   
     return await Project.find({active: true}).session(session);
     // return projects.filter(project => project.profiles.filter(profile => profile.name.includes(talent)).length);
}

exports.deleteProjects = async (idProject, session) => {
    
    return Project.deleteOne({_id:mongoose.Types.ObjectId(idProject)}).session(session) ;
}
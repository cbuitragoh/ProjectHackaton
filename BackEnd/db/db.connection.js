var mongoose = require('mongoose');
var config = require('../config.json');

var db;

exports.mongooseConnection = () => {
    return new Promise((resolve, reject) => {
        mongoose.Promise = global.Promise;

        if (db) {
            return resolve(db);
        }
        
        mongoose.connect(`mongodb+srv://admin:${config.db.user}@cluster0.a6ow0.mongodb.net/${config.db.db}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
                .then(()=> {
                    db = mongoose.connection;
                    console.log('Connection to db has been created successfully');
                    resolve(db);
                })
                .catch((err) => {
                    console.log('Error creating connection to db: ' + err);
                    reject(err);
                })

        
    })
}
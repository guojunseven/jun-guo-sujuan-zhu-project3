const Schema = require('mongoose').Schema;

exports.FavoriteSchema = new Schema({
    name: {type: String, require: true},
    jobId: {type: String, require: true},
    status: {type: String, require: true}
}, { collection : 'favorites' });
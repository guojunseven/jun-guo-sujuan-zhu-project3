const Schema = require('mongoose').Schema;

exports.JobSchema = new Schema({
    id: {type: String, required: true},
    title: {type: String, required: true},
    company: {type: String, required: true},
    location: {type: String, required: true},
    description: {type: String, required: true},
    email: {type: String, required: true},
    website: String,
    author: {type: String, required: true,},
    postDate: {
        type: Date,
        default: Date.now,
    },
}, { collection : 'job' });
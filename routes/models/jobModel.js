const mongoose = require("mongoose");
const JobSchema = require('../schemas/jobSchema').JobSchema

const JobModel = mongoose.model("Job", JobSchema);

function insertJob(job) {
    return JobModel.create(job);
}

function getJobById(id) {
    return JobModel.find({id: id}).exec();
}

function getJobsByIds(ids) {
    return JobModel.find({ 'id': { $in: ids } }).exec();
}

function getJobsByTitle(jobTitle) {
    // regex for case insensitive like search
    return JobModel.find({title: new RegExp(jobTitle, 'i')});
}

function updateJobById(id, modifiedJob) {
    return JobModel.findOneAndUpdate({id: id}, modifiedJob, {new : true});
}

function deleteJobById(id) {
    return JobModel.findOneAndDelete({id: id});
}

module.exports = {
    insertJob,
    getJobById,
    getJobsByIds,
    getJobsByTitle,
    updateJobById,
    deleteJobById
};
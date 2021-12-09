const express = require('express');
const router = express.Router();
const { v4: uuid } = require('uuid');
const auth = require('../middleware/authMiddleware');
const JobModel = require('./models/jobModel');
const FavoriteModel = require('./models/favoriteModel');
 
//search all jobs match the given keyword 
router.get('/search/:jobTitle', function(req, res) {
    const jobTitle = req.params.jobTitle;
    if (jobTitle) {
        JobModel.getJobsByTitle(jobTitle).then(results => res.status(200).send(extractOverview(results)))
        .catch(err => res.status(500).send(err));
    } else {
        return res.status(422).send("must provide a valid job title");
    }
})

//find and return the detail of a given job based on the jobId
router.get('/findJobDetail/:jobId', function(req, res) {
    const jobId = req.params.jobId;
    if (jobId) {
        JobModel.getJobById(jobId).then(results => res.status(200).send(results))
        .catch(err => res.status(500).send("something went wrong!"));
    } else {
        return res.status(422).send("must provide a valid job id");
    }
})

//create a new job (require logged in)
router.post('/create', auth, function(req, res) {
    const job = {...req.body, id: uuid(), author: req.username};
    if (! isValidJob(job)) {
        return res.status(409).send("missing required parameter");
    }
    JobModel.insertJob(job).then(returnJob => res.status(200).send(returnJob)
    ).catch(error => res.status(500).send(error));
})

//edit an exsiting job (require logged in and authorization)
router.put('/edit/:jobId', auth, function(req, res) {
    const jobId = req.params.jobId;
    const job = req.body;
    if (! isValidJob(job)) {
        return res.status(409).send("missing required parameter");
    }
    JobModel.updateJobById(jobId, job).then(returnJob => res.status(200).send(returnJob)
    ).catch(error => res.status(500).send(error));
})

//delete an exsiting job (require logged in and authorization)
router.delete('/delete/:jobId', auth, function(req, res) {
    const jobId = req.params.jobId;
    JobModel.deleteJobById(jobId).then(result => {
        FavoriteModel.deleteFavoriteByNameAndID(jobId);
        res.status(200).send('successfully delete');
    }
    ).catch(err => res.status(500).send(err));
})

//get all favorite jobs as a list
router.get('/getFavorites', auth, function(req, res) {
    FavoriteModel.getFavoriteByName(req.username).then(results => {
        JobModel.getJobsByIds(results.map(({jobId}) => jobId)
        ).then((finalRes => res.status(200).send(addStatus(extractOverview(finalRes), results))))
    }).catch(err => res.status(500).send(err));
})

//check if the logged in user is the owner and favorite of this job post (require logged in and authorization);
router.get('/isOwner/:jobId', auth, function(req, res) {
    const favorite = {name: req.username, jobId: req.params.jobId};
    const payload = {};
    FavoriteModel.getFavoriteByNameAndID(favorite
        ).then(results => {payload.isFavorite = results.length > 0; 
            payload.status = results[0] ? results[0].status : "Not Started"}
        ).then(anotherResults => JobModel.getJobById(favorite.jobId
        ).then(finalRes => {payload.isOwner = finalRes[0] ? (finalRes[0].author === favorite.name) : false;
            res.status(200).send(payload)}
        ).catch(err => res.status(500).send(err)));
})

//change the status of the favorite job
router.put('/changeStatus/:jobId', auth, function(req, res) {
    const name = req.username;
    const jobId = req.params.jobId;
    const newStatus = req.body.status;
    FavoriteModel.updateFavoriteByNameAndID(name, jobId, newStatus
        ).then(results => {res.status(200).send("update successfully")}
        ).catch(err => {console.log(err), res.status(500).send(err)});
})

//favorite a job
router.post('/favorite/:jobId', auth, function(req, res) {
    const favorite = {name: req.username, jobId: req.params.jobId};
    FavoriteModel.insertFavorite(favorite).then(result => res.status(200).send(result)
    ).catch(err => {console.log(err), res.status(500).send(err)});
})

//unfavorite a job
router.post('/unfavorite/:jobId', auth, function(req, res) {
    const favorite = {name: req.username, jobId: req.params.jobId};
    FavoriteModel.deleteFavoriteByNameAndID(favorite
        ).then(result => res.status(200).send('delete favorite successfully')
        ).catch(err => {console.log(err), res.status(500).send(err)});
})

//check the params of the passed job
function isValidJob(job) {
    return job.title && job.company && job.location && job.description && job.email;
}

//extract only id, title, company, location from the returned jobs
function extractOverview(jobs) {
    if (jobs) {
        return jobs.map(function(element) {
            return {
                id: element.id,
                title: element.title,
                company: element.company,
                location: element.location
            }
        })
    }
    return jobs;
}

//append job application status to jobs array and group jobs
function addStatus(jobs, favorites) {
    const payload = {
        'Not Started': [],
        'Applied': [],
        'Interview Scheduled': [],
        'Accepted': [],
        'Rejected': []
    };
    const idToStatus = {};
    for (let favorite of favorites) {
       
        idToStatus[favorite.jobId] = favorite.status;
    }
    for (let job of jobs) {
        job.status = idToStatus[job.id];
        payload[job.status].push(job);
    }
    return payload;
}

module.exports = router;




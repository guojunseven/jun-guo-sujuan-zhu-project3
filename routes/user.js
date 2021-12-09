const express = require('express');
const router = express.Router();
const UserModel = require("./models/userModel");
const jwt = require('jsonwebtoken');
const auth = require('../middleware/authMiddleware');

//register and return the jwt token as cookie
router.post('/register', function(req, res) {
    const user = req.body;
    UserModel.getUserByName(user).then(results => {
        if (results.length > 0) {
            return res.status(409).send("The user name already exists!");
        } else {
            const payload = {username: user.name};
            const token = jwt.sign(payload, process.env.SUPER_SECRET, {
                expiresIn: '30d' // optional cookie expiration date
            });
            UserModel.insertUser(user); 
            return res.cookie('token', token, {httpOnly: true})
                .status(200).send({username: user.name});
        }
    }).catch(err => {console.log(err); res.status(500).send(err)})
})

//log in and return the jwt token as cookie
router.post('/login', function(req, res) {
    const user = req.body;
    if (! (user.name && user.password)) {
        return res.status(422).send("Must include both password and username");
    }
    UserModel.getUserByName(user)
        .then(result => {
            if (result.length === 0) {
                return res.status(404).send("No user found with that username");
            }
            if (result[0].password === user.password) {
                const payload = {username: user.name};
                const token = jwt.sign(payload, process.env.SUPER_SECRET, {
                    expiresIn: '30d' // optional cookie expiration date
                });
                return res.cookie('token', token, {httpOnly: true})
                    .status(200).send({username: user.name});
            } else {
                return res.status(400).send("The password does not match");
            }
        })
        .catch(err => {console.log(err); res.status(500).send(err)});
})

//check if the user is logged in
router.get('/loggedIn', auth, function(req, res) {
    return res.sendStatus(200);
})

//log out the user (authentication is required)
router.post('/logout', auth, function(req, res) {
    res.cookie('token', 'none', {
        expires: new Date(Date.now()), // set a new token which expires immediately
        httpOnly: true,
    })
    res.status(200).json({ success: true, message: 'User logged out successfully' });
})

module.exports = router;


const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.cookies.token;  
    if (!token) {
        // token is missing
        res.status(401).send('Unauthorized: Must login in first');
    } else {
        // check the validity of token
        jwt.verify(token, process.env.SUPER_SECRET, function(err, decoded) {
            if (err) {
                res.status(401).send('Unauthorized: No authorization');
            } else {
                req.username = decoded.username;
                next();
            }
        });
    }
}
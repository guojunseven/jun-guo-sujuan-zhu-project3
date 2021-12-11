const Schema = require('mongoose').Schema;
const bcrypt = require('bcryptjs');

exports.UserSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    password: {
        type:String
    }
}, { collection : 'users' });

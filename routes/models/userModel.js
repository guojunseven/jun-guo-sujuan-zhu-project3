const mongoose = require("mongoose")
const UserSchema= require('../schemas/userSchema').UserSchema

const UserModel = mongoose.model("User", UserSchema);

function insertUser(user) {
    return UserModel.create(user);
}

function getUserByName(user) {
    return UserModel.find({name: user.name}).exec();
}

module.exports = {
    insertUser,
    getUserByName
};
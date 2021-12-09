const mongoose = require("mongoose")
const FavoriteSchema= require('../schemas/favoriteSchema').FavoriteSchema

const FavoriteModel = mongoose.model("Favorite", FavoriteSchema);

function insertFavorite(favorite) {
    const favorites = FavoriteModel.find(favorite);
    if (favorites[0]) { // check if the favorite already exists
        return favorites[0];
    } else { // create if not exists
        return FavoriteModel.create({...favorite, status:'Not Started'});
    }
}

function getFavoriteByNameAndID(favorite) {
    return FavoriteModel.find(favorite).exec();
}

function getFavoriteByName(username) {
    return FavoriteModel.find({name: username}).exec();
}

function updateFavoriteByNameAndID(name, id, status) {
    return FavoriteModel.updateMany({name: name, jobId: id}, {status: status});
}

function deleteFavoriteByNameAndID(favorite) {
    return FavoriteModel.find(favorite).deleteMany();
}

function deleteFavoriteByID(jobId) {
    return FavoriteModel.find({jobId: jobId}).deleteMany();
}

module.exports = {
    insertFavorite,
    getFavoriteByNameAndID,
    getFavoriteByName,
    updateFavoriteByNameAndID,
    deleteFavoriteByNameAndID
};
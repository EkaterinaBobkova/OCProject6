const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({

    //*id de l'utilisateur qui a crée la sauce*//
    userId: {
        type: String,
        required: true
    },
    //* nom de la sauce*//
    name: {
        type: String,
        required: true
    },
    //* fabricant de la sauce*//
    manufacturer: {
        type: String,
        required: true
    },
    //*description de la sauce*//
    description: {
        type: String,
        required: true
    },
    //*ingredient principal*//
    mainPepper: {
        type: String,
        required: true
    },
    //*url de l'image chargée par l'utilisateur*//
    imageUrl: {
        type: String,
        required: true
    },
    //*note de puissance de 1 à 10*//
    heat: {
        type: Number,
        required: true
    },
    //*nombre de likes utilisateurs*//
    likes: {
        type: Number,
        default: 0
    },
    //*nb d'utilisateurs qui n'aiment pas la sauce*//
    dislikes: {
        type: Number,
        default: 0
    },
    //*tableau d'id d'utilisateur(s) ayant aimé la sauce*//
    usersLiked: {
        type: [String]
    },
    //*tableau d'id d'utilisateur(s) n'ayant pas aimé la sauce*//
    usersDisliked: {
        type: [String]
    }
});

module.exports = mongoose.model('Sauce', sauceSchema);
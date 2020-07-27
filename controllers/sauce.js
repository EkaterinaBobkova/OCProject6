const Sauce = require('../models/sauce');
const fs = require('fs');


//Logique metier//


//POST//
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({
            message: 'Sauce enregistrée'
        }))
        .catch(error => res.status(400).json({
            error
        }));
};


/* POST LIKE */
exports.postLike = (req, res, next) => {
    const like = req.body.like;
    const userId = req.body.userId;

    if (like === 0) {
        Sauce.findOne({
                _id: req.params.id
            })
            .then((sauce) => {

                if (sauce.usersLiked.includes(req.body.userId)) {
                    Sauce.updateOne({
                            _id: req.params.id
                        }, {
                            $pull: {
                                usersLiked: req.body.userId
                            },
                            $inc: {
                                likes: -1
                            },
                            _id: req.params.id
                        })
                        .then(() => res.status(200).json({
                            message: 'Like supprimé'
                        }))
                        .catch((error) => res.status(400).json({
                            error
                        }))
                }
                if (sauce.usersDisliked.includes(req.body.userId)) {
                    Sauce.updateOne({
                            _id: req.params.id
                        }, {
                            $pull: {
                                usersDisliked: req.body.userId
                            },
                            $inc: {
                                dislikes: -1
                            },
                            _id: req.params.id
                        })
                        .then(() => res.status(200).json({
                            message: 'Dislike supprimé'
                        }))
                        .catch((error) => res.status(400).json({
                            error
                        }))
                } else {
                    () => res.status(200).json({
                        message: 'Merci de  donner votre avis sur la sauce !'
                    })
                }
            })
            .catch((error) => res.status(404).json({
                error
            }))
    };

    if (like === 1) {
        Sauce.updateOne({
                _id: req.params.id
            }, {
                $push: {
                    usersLiked: userId
                },
                $inc: {
                    likes: 1
                },
            })
            .then(() => res.status(200).json({
                message: 'Like ajouté'
            }))
            .catch((error) => res.status(400).json({
                error
            }))
    };

    if (like === -1) {
        Sauce.updateOne({
                _id: req.params.id
            }, {
                $push: {
                    usersDisliked: userId
                },
                $inc: {
                    dislikes: 1
                },
            })
            .then(() => res.status(200).json({
                message: 'dislike ajouté'
            }))
            .catch((error) => res.status(400).json({
                error
            }))
    };
};



// PUT //

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {
        ...req.body
    };
    if (req.file) {
        Sauce.findOne({
                _id: req.params.id
            })
            .then(sauce => {
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Sauce.updateOne({
                            _id: req.params.id
                        }, {
                            ...sauceObject,
                            _id: req.params.id
                        })
                        .then(() => res.status(200).json({
                            message: 'Sauce et image modifiée'
                        }))
                        .catch(error => res.status(400).json({
                            error
                        }));
                });
            }).catch(error => res.status(400).json({
                error
            }))
    } else {
        Sauce.updateOne({
                _id: req.params.id
            }, {
                ...sauceObject,
                _id: req.params.id
            })
            .then(() => res.status(200).json({
                message: 'Sauce modifiée'
            }))
            .catch(error => res.status(400).json({
                error
            }));
    }
};


// DELETE //

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({
            _id: req.params.id
        })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({
                        _id: req.params.id
                    })
                    .then(() => res.status(200).json({
                        message: 'Sauce supprimée !'
                    }))
                    .catch(error => res.status(400).json({
                        error
                    }));
            });
        })
        .catch(error => res.status(500).json({
            error
        }));
};



/* GET ONE SAUCE */
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
            _id: req.params.id
        })
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({
            error
        }));
};



/* GET ALL SAUCES */
exports.getAllSauce = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({
            error
        }));
};
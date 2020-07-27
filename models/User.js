const mongoose = require('mongoose');
//package de la propriété "unique" pour empêcher l'inscription des utilisateurs avec la même adresse mail//
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
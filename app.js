const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const sauceRoutes = require('./routes/sauce');

mongoose.connect('mongodb+srv://NewUser:tTlVrc8wgzpA2MMh@cluster0-wxfsq.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

/* CROSS ORIGIN RESOURCE SHARING CORS*/
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

/* .json - méthode de l'objet bodyParser qui transforme le corps de la requête en objet JS*/
app.use(bodyParser.json());

app.use('/api/sauces', sauceRoutes);

module.exports = app;
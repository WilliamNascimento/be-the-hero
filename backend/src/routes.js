const express = require('express');

//Controllers imports
const OngsController = require('./controllers/OngController');
const IncidentsController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();//Desacoplando o módulo de rotas do express em uma váriavel

routes.post('/session', SessionController.create);

//Ongs
routes.get('/ongs', OngsController.index);
routes.post('/ongs', OngsController.create);

//Incidents
routes.get('/incidents', IncidentsController.index);
routes.post('/incidents', IncidentsController.create);
routes.delete('/incidents/:id', IncidentsController.delete)

routes.get('/profile', ProfileController.index);

module.exports = routes;
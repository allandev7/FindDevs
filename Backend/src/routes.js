const { Router } = require('express');
const DevControoller = require('./controllers/DevController');
const SearchDevController = require('./controllers/SearchDevController');
const routes = Router();

routes.get('/devs', DevControoller.index);
routes.get('/search', SearchDevController.index);
routes.post('/devs',() => DevControoller.gravar);



module.exports = routes;
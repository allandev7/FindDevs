const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchDevController = require('./controllers/SearchDevController');
const routes = Router();

routes.get('/devs', DevController.index);
routes.get('/search', SearchDevController.index);
routes.post('/devs', DevController.store);



module.exports = routes;
const routes = require('express').Router();

routes.use('/toDo', require('./toDo'));

module.exports = routes;
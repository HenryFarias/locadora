const cors = require('cors');
const express = require('express');
const app = module.exports = express();
const bodyParser = require('body-parser');
const errorHandler = require('./errorHandler');
const config = require('./config/config');
require('./config/db');
const consign = require('consign');

const movieController = require('./controller/movieController');
const authController = require('./controller/authController');
const userController = require('./controller/userController');

// CORS
app.use(cors(config.cors));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({extended: true}));

//ROUTES
app.use('/', authController);
app.use('/user', userController);
app.use('/movie', movieController);

// consign().include('controller');

app.use(errorHandler);

module.exports = app;
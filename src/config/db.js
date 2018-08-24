require('dotenv').config();

global.Sequelize = require('sequelize');
global.db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,
    { port: process.env.DB_PORT, host: process.env.DB_HOST, dialect: process.env.DB_DIALECT });
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const sequelize = new Sequelize('lusoteric', process.env.MY_SQL_USERNAME, process.env.MY_SQL_PASSWRD, {
    host: process.env.MY_SQL_HOST,
    dialect: 'mysql',
});

module.exports = sequelize;

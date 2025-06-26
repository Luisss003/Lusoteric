const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./database');

const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.TEXT,
            allowNull:false,
        },
        country:{
            type: DataTypes.STRING,
            allowNull: false
        },
        rank: {
            type:DataTypes.ENUM('noob', 'skid', 'stackoverflow user', 'virgin', 'wizard', 'jeezus' ,'YWHW')
            
        },
        submissionsCreated: {

        },
        challengesSolved:{

        },
        password: {
            
        },
        confirmPassword:{
            
        },
    },
    {
        sequelize,
        modelName: 'User',
    },
);

module.exports = User;
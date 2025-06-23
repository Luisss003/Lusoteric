const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./database');

const Code = sequelize.define(
    'Code',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        code: {
            type: DataTypes.TEXT,
            allowNull:false,
        },
        language:{
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id:{
            type:DataTypes.INTEGER,
            allowNull: false,
        },
        challenge_id:{
            type:DataTypes.INTEGER,
            allowNull: false,
        },

    },
    {
        sequelize,
        modelName: 'Code',
    },
);


module.exports = Code;
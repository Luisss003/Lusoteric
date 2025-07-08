const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Challenge = sequelize.define(
    'Challenge',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        challenge: {
            type: DataTypes.TEXT,
            allowNull:false,
        },
        language:{
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type:DataTypes.ENUM('Code Golf', 'Obfuscation', 'Esolang', 'One-Liner', 'Forbidden Keywords', 'Poetic Code')
        },
        user_id:{
            type:DataTypes.INTEGER,
            allowNull: false,
        },

    },
    {
        sequelize,
        modelName: 'Challenge',
    },
);


module.exports = Challenge;
import { DataTypes } from 'sequelize';
import sequelize from './../utils/sequelize.js';

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
        votes: {
            type: DataTypes.INTEGER
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
        modelName: 'Code',
    },
);


export default Code;
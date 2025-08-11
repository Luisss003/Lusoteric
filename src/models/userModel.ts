import { DataTypes } from 'sequelize';
import sequelize from './../utils/sequelize.js';

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
            type:DataTypes.ENUM('noob',
                                'skid',
                                'stackoverflow user',
                                'wizard',
                                'jeezus'
                                ,'YWHW'),
            defaultValue: 'noob'
        },
        submissionsCreated: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        challengesSolved:{
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        confirmPassword:{
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        modelName: 'User',
    },
);

export default User;
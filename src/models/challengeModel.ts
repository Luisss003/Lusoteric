import { DataTypes } from 'sequelize';
import sequelize from './../utils/sequelize.js';

//Define the Challenge model
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
            type:DataTypes.ENUM('Code Golf',
                                'Obfuscation',
                                'Esolang',
                                'One-Liner',
                                'Forbidden Keywords',
                                'Poetic Code')
        },
        user_id:{
            type:DataTypes.INTEGER,
            allowNull: false,
        },

    },
    {
        modelName: 'Challenge',
    },
);


export default Challenge;
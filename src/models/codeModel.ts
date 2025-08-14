import { Model, DataTypes } from 'sequelize';
import sequelize from './../utils/sequelize.js';

class Code extends Model {
    declare id: number;
    declare code: string;
    declare language: string;
    declare votes: number;
    declare user_id: number;
    declare challenge_id: number;
}

Code.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    code: {
        type: DataTypes.TEXT,
        allowNull: false,
    }, language:{
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
    }, {
        sequelize,
        modelName: 'Code',
    });


export default Code;
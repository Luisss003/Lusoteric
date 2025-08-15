import { Model, DataTypes } from 'sequelize';
import sequelize from './../utils/sequelize.js';

class Challenge extends Model {
    declare id: number;
    declare challenge: string;
    declare language: string;
    declare category: 'Code Golf' | 'Obfuscation' | 'Esolang' | 'One-Liner' | 'Forbidden Keywords' | 'Poetic Code';
    declare user_id: number;
    declare solution: string
};

Challenge.init({
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
    solution: {
        type: DataTypes.TEXT,
        allowNull: false,
    }},
    {
        sequelize,
        modelName: 'Challenge',
    }
);


export default Challenge;
import { DataTypes } from 'sequelize';
import sequelize from './../utils/sequelize.js';
import bcrypt from 'bcrypt';

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
    },
    {
        modelName: 'User',
        hooks: {
            //Ensure password field is not empty and hash it before saving
            //This executes upon creation of a new user
            beforeCreate: async(user: any) => {
                if (!user.password) {
                    throw new Error('Password is required');
                }
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, 12);
                
            }
        }
    },
);

export default User;
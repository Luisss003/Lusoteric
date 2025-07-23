import app from './app';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

const Challenge = require('./models/challengeModel');
const Code = require('./models/codeModel');
const User = require('./models/userModel');

// Load env variables
dotenv.config({ path: './config.env' });

//Create Sequelize instance
export const sequelize = new Sequelize('Lusoteric', process.env.MY_SQL_USERNAME!, 
                                process.env.MY_SQL_PASSWRD!, {
                                    host: process.env.MY_SQL_HOST!,
                                    dialect: 'mysql',
                                });

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        const ChallengeSynced = await Challenge.sync();
        const CodeSynced = await Code.sync();
        const UserSynced = await User.sync();
        
        // Start the server only after DB connection succeeds
        app.listen(8000, () => {
            console.log('server has started...');
        });

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();


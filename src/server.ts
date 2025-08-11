import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

import app from './app.js';
import Challenge from './models/challengeModel.js';
import Code from './models/codeModel.js';
import User from './models/userModel.js';
import sequelize from './utils/sequelize.js';

// Sync models with the database
(async () => {
    try {
        // Test DB connection
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        // Sync models
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


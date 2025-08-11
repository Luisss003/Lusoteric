import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });
console.log('cwd:', process.cwd());

// src/sequelize.ts
import { Sequelize } from 'sequelize';

console.log(process.env.MY_SQL_PASSWRD);
console.log(process.env.MY_SQL_USERNAME);
console.log(process.env.MY_SQL_HOST);
const sequelize = new Sequelize('Lusoteric', process.env.MY_SQL_USERNAME!, 
                                process.env.MY_SQL_PASSWRD!, {
                                    host: process.env.MY_SQL_HOST!,
                                    dialect: 'mysql',
                                });

export default sequelize;
import { Model, DataTypes } from 'sequelize';
import sequelize from './../utils/sequelize.js';
import bcrypt from 'bcrypt';

class User extends Model {
    declare id: number;
    declare username: string;
    declare country: string;
    declare rank: 'noob' | 'skid' | 'stackoverflow user' | 'wizard' | 'jeezus' | 'YWHW';
    declare submissionsCreated: number;
    declare challengesSolved: number;
    declare password: string;

    // Instance method
    async comparePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rank: {
        type: DataTypes.ENUM('noob',
                            'skid',
                            'stackoverflow user',
                            'wizard',
                            'jeezus',
                            'YWHW'),
        defaultValue: 'noob'
    },
    submissionsCreated: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    challengesSolved: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'User',
    hooks: {
        beforeCreate: async (user: User) => {
            if (!user.password) {
                throw new Error('Password is required');
            }
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, 12);
        }
    }
});

export default User;
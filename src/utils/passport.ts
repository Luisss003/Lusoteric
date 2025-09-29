import fs from 'fs';
import path from 'path';
import { User } from '@prisma/client';
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import prisma from './databaseService.js';
import { fileURLToPath } from 'url';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the key from the same directory as this compiled file
const PUB_KEY = fs.readFileSync(path.join(__dirname, 'id_rsa_pub.pem'), 'utf8');

const option: StrategyOptions = {
    //Expecting Authorization: Bearer <token>const strategy = new JwtStrategy(option as , () => {});

    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ['RS256']
};

//This implicitly uses JWT authentication, and simply
//looks for the user
const strategy = new JwtStrategy(option, (payload, done) => {
    //Find user based on userID, which we add to .sub in 
    //generalUtils issueJwt function
    prisma.user.findFirst({where: {id: payload.sub}})
        .then((user: User | null) => {
            if (user) { //If user found, return user obj
                //user obj gets attached to req.user
                return done(null, user);
            }
            return done(null, false); //Indicate no user found
        })
        //Indicate error in auth attempt
        .catch(err => done(err, null));
});

export const passportConfig = (passport: any) => {
    passport.use(strategy);
};
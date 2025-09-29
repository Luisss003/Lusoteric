import crypto from 'crypto';
import { User } from '@prisma/client';
import jsonwebtoken from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the key from the same directory as this compiled file
const PRIV_KEY = fs.readFileSync(path.join(__dirname, 'id_rsa_priv.pem'), 'utf8');

export function genPassword(password: string){

    const salt = crypto.randomBytes(32).toString('hex');
    const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return {
        salt: salt,
        hash: genHash
    };
}

export function issueJwt(user: User){
    //Extract user ID
    const _id = user.id;
    const expiresIn = '1d';

    //Payload for JWT
    const payload = {
        sub: _id,
        iat: Date.now()
    };

    const signedToken = jsonwebtoken.sign(payload, PRIV_KEY,
        {algorithm: 'RS256', expiresIn: expiresIn});
    
    return {
        token: "Bearer " + signedToken,
        expires: expiresIn
    };
}

export function validatePassword(password: string, hash: string, salt: string){
    const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
}


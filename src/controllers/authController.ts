import asyncErrorHandler from '../utils/asyncErrorHandler.js';
import { Request, Response } from 'express';
import prisma from '../utils/databaseService.js';
import { User } from "@prisma/client";
import jwt from 'jsonwebtoken';
import * as utils from '../utils/generalUtils.js';

//POST - /auth/signup
export const signup = asyncErrorHandler(
    async (req: Request, res: Response) => {
        const {username, password, country} = req.body;
        if (!username || !password || !country) {
            return res.status(400)
                .json({message: 'Username, password andcountry are required'});
        }

        //Hash password
        const saltHash = utils.genPassword(password);

        //Create user
        const newUser: User = await prisma.user.create({
            data: {
                username: username,
                password: saltHash.hash,
                salt: saltHash.salt,
                country: country
            }
        });

        const jwt = utils.issueJwt(newUser);
        
        return res.status(201).json({
            status: 'success',
            user: newUser,
            token: jwt.token,
            expiresIn: jwt.expires
        });
    }
);

//POST - /auth/login
export const login = asyncErrorHandler(
    async (req: Request, res: Response) => {
        //Extract user/passwrd from body
        const {username, password} = req.body;
        if (!username || !password) {
            return res.status(400)
                .json({message: 'Username and password are required'});
        }
        //Generate hash from password and salt
        const user = await prisma.user.findFirst({
            where: {username: username}
        })

        if (!user) {
            return res.status(401).json({message: 'Could not find user'});
        }



        //Compare hash to stored hash
        const isValid = utils.validatePassword(password, user.password, user.salt);

        //If match, issue JWT
        if (isValid) {
            const jwt = utils.issueJwt(user);
            return res.status(200).json({
                status: 'success',
                user: user,
                token: jwt.token,
                expiresIn: jwt.expires
            });
        }
        //Else, return 401
        return res.status(401).json({message: 'You entered the wrong password'});
    })


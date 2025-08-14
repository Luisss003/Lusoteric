import User from '../models/userModel.js';
import asyncErrorHandler from '../utils/asyncErrorHandler.js';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt, { compare } from 'bcrypt';

export const signup = asyncErrorHandler(
    async (req: Request, res: Response) => {

        //Create a new user based on request body
        //Assuming req has been validated and sanitized
        const newUser = await User.create(req.body);

        //Create and send JWT token for the new user
        const token = jwt.sign({id: newUser.id}, process.env.JWT_SECRET_KEY!, {})

        res.status(201).json({
            status: "success",
            token: token,
            data: {
                user: newUser
            }
        });

    });

export const login = asyncErrorHandler(
    async (req: Request, res: Response) => {
        //Extract email and password from request body
        const {username, password} = req.body;

        if(!username || !password) {
            return res.status(400).json({
                status: "fail",
                message: "Please provide email and password"
            });
        };

        //Find user by email, and exclude password from the response
        const user = await User.findOne({
            where: {
                username: username,
            },
        });

        if(!user) {
            return res.status(401).json({
                status: "fail",
                message: "Incorrect username or password"
            });
        };

        //Check if password matches
        const isMatch = await user.comparePassword(password);

        if(!isMatch) {
            return res.status(401).json({
                status: "fail",
                message: "Incorrect username or password"
            });
        };

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET_KEY!, {})


        res.status(200).json({
            status: "success",
            token: token,
            data: {
                user: user
            }
        });

    });

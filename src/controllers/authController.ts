import User from '../models/userModel.js';
import asyncErrorHandler from '../utils/asyncErrorHandler.js';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

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


import User from '../models/userModel.js';
import asyncErrorHandler from '../utils/asyncErrorHandler.js';
import { Request, Response } from 'express';

export const signup = asyncErrorHandler(
    async (req: Request, res: Response) => {

        //Create a new user based on request body
        //Assuming req has been validated and sanitized
        const newUser = await User.create(req.body);

        res.status(201).json({
            status: "success",
            data: {
                user: newUser
            }
        });

    });


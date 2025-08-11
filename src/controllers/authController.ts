import User from '../models/userModel';
import asyncErrorHandler from '../utils/asyncErrorHandler';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

exports.signup = asyncErrorHandler(
    async(req: Request, res: Response, next: NextFunction) => {
        
        //Assuming req.body has been sanitized and validated
        //Create user in the database
        const newUser = await User.create(req.body);

        //TODO: Generate JWT token

        res.status(200).json({
            status: "success",
            data: {
                newUser
            }
        });   
});

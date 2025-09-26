import asyncErrorHandler from '../utils/asyncErrorHandler.js';
import { Request, Response } from 'express';
import prisma from '../utils/databaseService.js';
import { User } from "../generated/prisma/index.js";

export const signup = asyncErrorHandler(
    async (req: Request, res: Response) => {
        const {username, password, country} = req.body;
        const newUser = await prisma.user.create({
            data: {
                username: username,
                password: password,
                country: country,
            }
        })

        res.status(201).json({
            status: "success",
            data: {
                user: newUser
            }
        });

    });
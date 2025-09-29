import asyncErrorHandler from './../utils/asyncErrorHandler.js';
import { Request, Response, NextFunction } from 'express';
import { execFile } from 'child_process';
import {promisify} from 'util';

import prisma from '../utils/databaseService.js';
import { Challenge } from '@prisma/client';

//GET - api/v1/challenges
export const getChallenges = asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        //Fetch all challenges from the database
        const challenges: Challenge[] = await prisma.challenge.findMany();

        //If no challenges found, return 404
        if (!challenges) {
            return res.status(404).json({
                status: "failed",
                message: "No challenges found..."
            });
        };

        //Return the challenges in the response
        res.status(200).json({
            status: "success",
            data: {
                challenges
            }
        });
});

//POST - /api/v1/challenges
export const createChallenge = asyncErrorHandler(
    async(req: Request, res: Response, next: NextFunction) => {
        const {language, description, category,
                createdBy} = req.body

        //Assuming req.body has been sanitized and validated
        //Create a new challenge in the database
        const newChallenge: Challenge | null = await prisma.challenge.create({
            data: {
                language: language,
                description: description,
                category: category,
                createdBy: createdBy,
            }
        });

        //Return the newly created challenge in the response
        res.status(200).json({
            status: "success",
            data: {
                newChallenge
            }
        });
});

//GET - /api/v1/challenges/:id
export const getChallengeById = asyncErrorHandler(
    async(req: Request, res: Response, next: NextFunction) => {
        const challenge: Challenge | null = await prisma.challenge.findFirst({
            where: {
                id: req.params.id
            }
        })

        if(!challenge){
            return res.status(404).json({
                status: "failed",
                message: "Challenge was not found..."
            });
        }
        res.status(200).json({
            status: "success",
            data: {
                challenge
            }
        });
});

import asyncErrorHandler from './../utils/asyncErrorHandler.js';
import Challenge from '../models/challengeModel.js';
import { Request, Response, NextFunction } from 'express';

//GET - api/v1/challenges
export const getChallenges = asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        //Fetch all challenges from the database
        const challenges = await Challenge.findAll();

        //If no challenges found, return 404
        if (!challenges || challenges.length === 0) {
            return res.status(404).json({
                status: "failed",
                message: "No challenges found..."
            });
        };

        //Return the challenges in the response
        res.status(200).json({
            status: "success",
            length: challenges.length,
            data: {
                challenges
            }
        });
});

//POST - /api/v1/challenges
export const createChallenge = asyncErrorHandler(
    async(req: Request, res: Response, next: NextFunction) => {
        //Assuming req.body has been sanitized and validated
        //Create a new challenge in the database
        const newChallenge = await Challenge.create(req.body);

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
        const challenge = await Challenge.findAll({
            where: {
                id: req.params.id,
            }
        });

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

//PATCH - /api/v1/challenges/:id
export const updateChallengeById = asyncErrorHandler(
    async(req: Request, res: Response, next: NextFunction) => {
        const updatedChallenge = await Challenge.update(
            req.body,
            {
                where:{
                    id: req.params.id
                }
            }
        );

        res.status(200).json({
            status: "success",
            message: "Challenge successfully updated..."
        });
});

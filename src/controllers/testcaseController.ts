import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import { Request, Response, NextFunction } from 'express';
import prisma from '../utils/databaseService.js'
import { Testcase } from "@prisma/client";
import { Challenge } from "@prisma/client";

//POST - /api/v1/testcase Create a testcase
export const createTestcase = asyncErrorHandler(
    async(req: Request, res: Response) => {
        const {input, output, createdBy, challengeId} = req.body;

        //Validate that user creating the testcase is the creator of challenge
        const challenge: Challenge | null = await prisma.challenge.findUnique({
            where: {
                id: challengeId
            }
        });

        if(!challenge){
            return res.status(404).json({
                status: 'failure',
                message: "Challenge not found"
            })
        }

        if(challenge.createdBy !== createdBy){
            return res.status(403).json({
                status: 'failure',
                message: "You are not authorized to create testcase for this challenge"
            })
        }

        const newTestcase: Testcase = await prisma.testcase.create({
            data: {
                input,
                output,
                createdBy,
                challengeId
            }
        });

        if(!newTestcase){
            return res.status(404).json({
                status: 'failure',
                message: "Unable to create testcase"
            })
        };

        res.status(201).json({
            status: "sucess",
            data: {
                newTestcase
            }
        })
    });
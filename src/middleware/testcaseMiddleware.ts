import { Request, Response, NextFunction } from 'express';
import prisma from '../utils/databaseService.js'
import { Testcase } from "@prisma/client";
import asyncErrorHandler from '../utils/asyncErrorHandler.js';

//The point of this middleware is to append the testcase to the request object
//so that test cases can be used in execution controller
export const appendTestcaseMiddleware = asyncErrorHandler(
    async(req: Request, res: Response, next: NextFunction) => {
        
        //Extract first 3 testcases for challenge
        const challengeId = req.body.challengeId;
        const firstThreeTestcases: {input: string, output: string}[] =
         await prisma.testcase.findMany({
            where: {
                challengeId: challengeId
            },
            select: {
                input: true,
                output: true
            },
            take: 3
        });

        if(!firstThreeTestcases){
            return res.status(404).json({message: "No testcases found for challenge"}); 
        }

        //Append to request object
        (req as any).testcases = firstThreeTestcases;
        console.log(typeof(req as any).testcases);
        next();
    });

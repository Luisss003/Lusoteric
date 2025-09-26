import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import { Request, Response, NextFunction } from 'express';
import prisma from "../utils/databaseService.js";
import { CodeSubmission } from "@prisma/client";
import { Challenge } from "@prisma/client";
import { executeC, executeJava } from "../utils/executeUtils.js";

export const executeSubmission = asyncErrorHandler(
    async(req: Request, res: Response) => {
        const {challengeId, code} = req.body;

        let output = '';
        if(!challengeId || !code){
            return res.status(404).json({
                status: "failure",
                message: "Missing code or challenge..."
            })
        }

        //Get solution for challenge
        const {expectedOutput, language} = await prisma.challenge.findUnique({
            where: {
                id: challengeId
            },
            select: {
                expectedOutput: true,
                language: true,
            }
        }) || {};

        //Execute util function based on language
        switch(language){
            case "BASH":
                break;
            case "C":
                output = await executeC(code);
                break;
            case "CHEF":
                break;
            case "GO":
                break;
            case "HOLY_C":
                break;
            case "JAVA":
                output = await executeJava(code);
                break;
            case "JAVASCRIPT":
                break;
            case "PYTHON":
                break;
            case "RUST":
                break;
            case "SHAKESPEARE":
                break;
            case "X_86":
                break;
        }
    
        res.status(200).json({
            status: "success",
            data:{
                message: "this is your output !!!",
                output
            }
        })
    }
)
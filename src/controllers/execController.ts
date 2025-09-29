import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import { Request, Response, NextFunction } from 'express';
import prisma from "../utils/databaseService.js";
import { CodeSubmission } from "@prisma/client";
import { Challenge } from "@prisma/client";
import * as execUtils from "../utils/executeUtils.js";

export const executeSubmission = asyncErrorHandler(
    async(req: Request, res: Response) => {
        const {challengeId, code} = req.body;
        const {testcases} = (req as any);
        console.log(testcases)

        let output = '';
        let o: {
            output: string
            passed: boolean
        }
        
        if(!challengeId || !code){
            return res.status(404).json({
                status: "failure",
                message: "Missing code or challenge..."
            })
        }

        //Get solution for challenge
        const { language} = await prisma.challenge.findUnique({
            where: {
                id: challengeId
            },
            select: {
                language: true,
            }
        }) || {};

        //Execute util function based on language
        switch(language){
            case "BASH":
                output = await execUtils.executeBash(code);
                break;
            case "C":
                output = await execUtils.executeC(code, testcases);
                break;
            case "CHEF":
                output = await execUtils.executeChef(code);
                break;
            case "GO":
                output = await execUtils.executeGo(code);
                break;
            case "HOLY_C":
                output = await execUtils.executeHolyC(code);
                break;
            case "JAVA":
                output = await execUtils.executeJava(code);
                break;
            case "JAVASCRIPT":
                output = await execUtils.executeJavaScript(code);
                break;
            case "PYTHON":
                break;
            case "RUST":
                output = await execUtils.executeRust(code);
                break;
            case "SHAKESPEARE":
                output = await execUtils.executeShakespeare(code);
                break;
            case "X_86":
                output = await execUtils.executeX86(code);
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
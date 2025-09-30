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

        
        let output: { output: string; passed: boolean } = {
            output: "",
            passed: false
        };
        
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
                output = await execUtils.executeBash(code, testcases);
                break;
            case "C":
                output = await execUtils.executeC(code, testcases);
                break;
            case "CHEF":
                //output = await execUtils.executeChef(code, testcases);
                break;
            case "GO":
                output = await execUtils.executeGo(code, testcases);
                break;
            case "HOLY_C":
                //output = await execUtils.executeHolyC(code);
                break;
            case "JAVA":
                output = await execUtils.executeJava(code, testcases);
                break;
            case "JAVASCRIPT":
                output = await execUtils.executeJavaScript(code, testcases);
                break;
            case "PYTHON":
                break;
            case "RUST":
                output = await execUtils.executeRust(code, testcases);
                break;
            case "SHAKESPEARE":
                output = await execUtils.executeShakespeare(code, testcases);
                break;
            case "X_86":
                output = await execUtils.executeX86(code, testcases``);
                break;
            default:
                return res.status(404).json({
                    status: "failure",
                    message: "Language not supported..."
                })
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
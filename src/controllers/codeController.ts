import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import { Request, Response, NextFunction } from 'express';
import prisma from '../utils/databaseService.js'
import { CodeSubmission } from "@prisma/client";


//GET - /api/v1/code
export const getCodeSubmissions = asyncErrorHandler(
    async(req: Request, res: Response, next: NextFunction) => {
    //Fetch all code submissions from the database
    const codeSubmissions: CodeSubmission[] = await prisma.codeSubmission.findMany();

    //Return 200 status code and the list of code submissions
    res.status(200).json({
        status: "success",
        data:{
            codeSubmissions
        }
    });
});

//POST - /api/v1/code
export const createCodeSubmission = asyncErrorHandler(
    async(req: Request, res: Response) => {
    const {code, language, createdBy, challengeId} = req.body;
    //Create new code submission based on request body
    const newCodeSubmission: CodeSubmission = await prisma.codeSubmission.create({
        data: {
            code: code,
            language: language,
            createdBy: createdBy,
            challengeId: challengeId
        }
    })

    //Return 201 status code and the new code submission if successful
    res.status(201).json({
        status: "sucess",
        data: {
            newCodeSubmission
        }
    });
});

//GET - /api/v1/code/:id
export const getCodeSubmissionById = asyncErrorHandler(
    async(req: Request, res: Response) => {
    
    //Find code submission by ID
    const code: CodeSubmission | null = await prisma.codeSubmission.findFirst({
        where: {
            id: req.params.id
        }
    })

    //Return 404 if not found
    if(!code){
        return res.status(404).json({
            status: "failed",
            message: "Code submission was not found..."
        });       
    }

    //Return code submission if found
    res.status(200).json({
        status: "success",
        data: {
            code
        }
    });
});
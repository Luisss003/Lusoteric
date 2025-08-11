import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import Code from './../models/codeModel.js';
import { Request, Response, NextFunction } from 'express';

//GET - /api/v1/code
export const getCodeSubmissions = asyncErrorHandler(
    async(req: Request, res: Response, next: NextFunction) => {
    //Fetch all code submissions from the database
    const codeSubmissions = await Code.findAll();

    //Return 200 status code and the list of code submissions
    res.status(200).json({
        status: "success",
        length: codeSubmissions.length,
        data:{
            codeSubmissions
        }
    });
});

//POST - /api/v1/code
export const createCodeSubmission = asyncErrorHandler(
    async(req: Request, res: Response, next: NextFunction) => {
    
    //Create new code submission based on request body
    const newCodeSubmission = await Code.create(req.body);

    //Return 201 status code and the new code submission if successful
    res.status(200).json({
        status: "status",
        data: {
            newCodeSubmission
        }
    });
});

//GET - /api/v1/code/:id
export const getCodeSubmissionById = asyncErrorHandler(
    async(req: Request, res: Response, next: NextFunction) => {
    
    //Find code submission by ID
    const code = await Code.findAll({
        where: {
            id: req.params.id
        }
    });

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
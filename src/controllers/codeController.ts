import asyncErrorHandler from "../utils/asyncErrorHandler";
import Code from './../models/codeModel';

//GET - /api/v1/code
export const getCodeSubmissions = asyncErrorHandler(async(req, res, next) => {
    const codeSubmissions = await Code.findAll();

    res.status(200).json({
        status: "success",
        length: codeSubmissions.length,
        data:{
            codeSubmissions
        }
    });
});

//POST - /api/v1/code
export const createCodeSubmission = asyncErrorHandler(async(req, res, next) => {
    const newCodeSubmission = await Code.create(req.body);

    res.status(200).json({
        status: "status",
        data: {
            newCodeSubmission
        }
    });
});

export const getCodeSubmissionById = asyncErrorHandler(async(req, res, next) => {
    const code = await Code.findAll({
        where: {
            id: req.params.id
        }
    });

    if(!code){
        return res.status(404).json({
            status: "failed",
            message: "Code submission was not found..."
        });       
    }

    res.status(200).json({
        status: "success",
        data: {
            code
        }
    });
});
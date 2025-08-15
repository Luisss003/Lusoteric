import asyncErrorHandler from './../utils/asyncErrorHandler.js';
import Challenge from '../models/challengeModel.js';
import * as fs from 'fs';
import { exec } from 'child_process';
import { Request, Response, NextFunction } from 'express';
import { execFile } from 'child_process';
import {promisify} from 'util';

const execFileAsync = promisify(execFile);

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


//Submit a solution to a challenge based on its ID:
// /api/v1/challenges/:id/submit
export const submitChallengeSolution = asyncErrorHandler(
    async(req: Request, res: Response, next: NextFunction) => {
        //Extract code text and challenge ID from the request
        const { codeText } = req.body;
        const challengeId = req.params.id;
        
        if (!codeText || !challengeId) {
            return res.status(400).json({
                status: "failed",
                message: "Code text and challenge ID are required."
            });
        }   

        //Extract the solution from the challenge
        const challengeSolution = await Challenge.findByPk(challengeId, {
            attributes: ['solution']
        });
        
        if (!challengeSolution) {
            return res.status(404).json({
                status: "failed",
                message: "Challenge not found."
            });
        }

        try {
            //Write code to a temp file
            const tempFilePath = '/tmp/userCode.c';
            await fs.promises.writeFile(tempFilePath, codeText, 'utf-8');

            //Execute the code in a sandboxed Docker container
            const { stdout, stderr } = await execFileAsync('docker', [
                'run', '--rm',
                '--memory=128m',
                '--cpus=0.5',
                '--network=none',
                '--read-only',
                '--tmpfs', '/tmp:exec,size=50m',
                '-v', `${tempFilePath}:/usr/src/app/userCode.c:ro`,
                '-w', '/usr/src/app',
                'gcc:latest',
                'sh', '-c', 'gcc userCode.c -o /tmp/runMe && /tmp/runMe'
            ], {
                //Set timeout if code hangs
                timeout: 15000,
                //Set buffer size for large outputs
                maxBuffer: 1024 * 1024
            });

            console.log("Code output:", stdout);
            console.log("Compiler/runtime errors:", stderr);

            // Clean up temp file
            try {
                await fs.promises.unlink(tempFilePath);
            } catch (cleanupError) {
                console.error("Failed to clean up temp file:", cleanupError);
            }

            res.status(200).json({
                status: "success",
                message: "Code executed successfully.",
                output: stdout,
                errors: stderr,
                expectedSolution: challengeSolution.solution
            });

        } catch (error: any) {
            console.error("Docker execution error:", error);
            
            // Clean up temp file even on error
            try {
                await fs.promises.unlink('/tmp/userCode.c');
            } catch (cleanupError) {
                console.error("Failed to clean up temp file:", cleanupError);
            }

            //Provide more specific error messages
            if (error.code === 'ENOENT') {
                return res.status(500).json({
                    status: "failed",
                    message: "Docker is not installed or not accessible."
                });
            } else if (error.signal === 'SIGTERM') {
                return res.status(408).json({
                    status: "failed",
                    message: "Code execution timed out."
                });
            } else {
                return res.status(500).json({
                    status: "failed",
                    message: "Code execution failed.",
                    error: error.message
                });
            }
        }
    });
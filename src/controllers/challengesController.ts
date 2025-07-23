import asyncErrorHandler from './../utils/asyncErrorHandler';
const Challenge = require('./../models/challengeModel');

//GET - api/v1/challenges
exports.getChallenges = asyncErrorHandler(async (req, res, next) => {
    const challenges = await Challenge.findAll();

    res.status(200).json({
        status: "success",
        length: challenges.length,
        data: {
            challenges
        }
    });
});

//POST - /api/v1/challenges
exports.createChallenge = asyncErrorHandler(async(req, res, next) => {
    const newChallenge = await Challenge.create(req.body);

    res.status(200).json({
        status: "success",
        data: {
            newChallenge
        }
    });
});

//GET - /api/v1/challenges/:id
exports.getChallengeById = asyncErrorHandler(async(req, res, next) => {
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
exports.updateChallengeById = asyncErrorHandler(async(req, res, next) => {
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

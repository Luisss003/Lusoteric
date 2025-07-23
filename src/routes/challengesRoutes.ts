const express = require('express');
const router = express.Router();
const ChallengesController = require('./../controllers/challengesController');

/*:8000/challenges
    GET: Display all challenges 
    POST: Create a new challenge
*/
router.route('/')
    .get(ChallengesController.getChallenges) 
    .post(ChallengesController.createChallenge); 
    

/*:8000/challenges/:id
    GET: Find challenge by ID
*/
router.route('/:id')
    .get(ChallengesController.getChallengeById)
    .patch(ChallengesController.updateChallengeById)
    .delete(ChallengesController.deleteChallengeById);
/*
:8000/challenges/:language
router.route('/:languge')
    .get()
*/
export default router;

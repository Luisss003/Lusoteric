const router = express.Router();
import express from 'express';
import * as ChallengesController from './../controllers/challengesController.js';

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
    .patch(ChallengesController.updateChallengeById);
/*
:8000/challenges/:language
router.route('/:languge')
    .get()
*/
export default router;

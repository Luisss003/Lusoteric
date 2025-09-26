const router = express.Router();
import express from 'express';
import * as ChallengesController from './../controllers/challengesController.js';


router.route('/')
    .get(ChallengesController.getChallenges) 
    .post(ChallengesController.createChallenge); 
    

/** 
router.route('/:id')
    .get(ChallengesController.getChallengeById)
    .patch(ChallengesController.updateChallengeById);


router.route('/:id/submit')
    .post(ChallengesController.submitChallengeSolution);
*/
export default router;


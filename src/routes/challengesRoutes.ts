const router = express.Router();
import express from 'express';
import * as ChallengesController from './../controllers/challengesController.js';
import passport from 'passport';


router.route('/')
    .get(passport.authenticate('jwt', {session: false}),ChallengesController.getChallenges) 
    .post(passport.authenticate('jwt', {session: false}),ChallengesController.createChallenge); 
    
export default router;


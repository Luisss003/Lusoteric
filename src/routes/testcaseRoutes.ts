import express from 'express';
import * as testcaseController from './../controllers/testcaseController.js'
const router = express.Router();
import passport from 'passport';

router.route('/')
    .post(passport.authenticate('jwt', {session: false}), 
        testcaseController.createTestcase);

export default router;
import express from 'express';
import * as codeController from './../controllers/codeController.js';
const router = express.Router();
import passport from 'passport';

/**
 * :8000/code/
 *      GET: Get all code submissions
 *      POST: Create a code submission
 */
router.route('/')
    .get(passport.authenticate('jwt', {session: false}),codeController.getCodeSubmissions)
    .post(passport.authenticate('jwt', {session: false}),codeController.createCodeSubmission);

/**
 * :8000/code/:id
 *      GET: Get code submission by ID
 */
router.route('/:id')
    .get(passport.authenticate('jwt', {session: false}),codeController.getCodeSubmissionById);

export default router;
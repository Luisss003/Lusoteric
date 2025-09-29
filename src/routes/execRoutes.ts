
import express from 'express';
import * as execController from './../controllers/execController.js';
import { appendTestcaseMiddleware } from '../middleware/testcaseMiddleware.js';
const router = express.Router();
import passport from 'passport';

router.route('/')
    .post(passport.authenticate('jwt', {session: false}),
        appendTestcaseMiddleware,
        execController.executeSubmission);

export default router;

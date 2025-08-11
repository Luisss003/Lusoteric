import express from 'express';
import * as codeController from './../controllers/codeController.js';
const router = express.Router();

/**
 * :8000/code/
 *      GET: Get all code submissions
 *      POST: Create a code submission
 */
router.route('/')
    .get(codeController.getCodeSubmissions)
    .post(codeController.createCodeSubmission);

/**
 * :8000/code/:id
 *      GET: Get code submission by ID
 */
router.route('/:id')
    .get(codeController.getCodeSubmissionById);

export default router;
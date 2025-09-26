
import express from 'express';
import * as execController from './../controllers/execController.js';
const router = express.Router();

router.route('/')
    .post(execController.executeSubmission);

export default router;

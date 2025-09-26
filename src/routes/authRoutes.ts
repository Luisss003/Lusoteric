import express from 'express';
import * as authController from './../controllers/authController.js';
const router = express.Router();

/**
 * :8000/auth/signup
 *     POST: Create a new user
 */
router.route('/signup')
    .post(authController.signup);


export default router;
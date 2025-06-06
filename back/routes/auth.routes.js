import express from 'express';
import authController from '../controllers/auth.controller.js';

const router = express.Router();

// POST /api/auth/register
router.post('/register', authController.register);

// POST /api/auth/login
router.post('/login', authController.login);

export default router;
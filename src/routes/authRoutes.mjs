// src/routes/authRoutes.mjs
import express from 'express';
import { register, login } from '../controllers/authController.mjs';
import { registerValidator, loginValidator } from '../middleware/authValidator.mjs';
import { validationResult } from 'express-validator';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;
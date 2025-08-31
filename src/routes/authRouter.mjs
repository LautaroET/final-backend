// src/routes/authRouter.mjs
import express from 'express';
import { register, login } from '../controllers/authController.mjs';
import {authenticateToken} from '../middleware/authMiddleware.mjs'

const authRouter = express.Router();

// Rutas de autenticación
authRouter.post('/register', register);
authRouter.post('/login', login);

export default authRouter;
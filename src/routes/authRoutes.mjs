import express from 'express';
import * as authController from '../controllers/authController.mjs';
import { solicitarResetController, resetPasswordController } from '../controllers/passwordResetController.mjs';

const router = express.Router();

router.post('/auth/registrar', authController.registrar);
router.post('/auth/login', authController.login);
router.post('/auth/forgot-password', solicitarResetController);
router.post('/auth/reset-password', resetPasswordController);

export default router;
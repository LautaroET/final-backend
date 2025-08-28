import express from 'express';
import * as authController from '../controllers/authController.mjs';

const router = express.Router();

router.post('/auth/registrar', authController.registrar);
router.post('/auth/login', authController.login);

export default router;
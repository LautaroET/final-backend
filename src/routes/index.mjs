import express from 'express';
import authRoutes from './authRoutes.mjs';
import refugioRoutes from './refugioRoutes.mjs';
import mascotaRoutes from './mascotaRoutes.mjs';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/refugios', refugioRoutes);
router.use('/mascotas', mascotaRoutes);

export default router;
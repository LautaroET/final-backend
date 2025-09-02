// src/routes/index.mjs
import express from 'express';
import authRoutes from './authRoutes.mjs';
import refugioRoutes from './refugioRoutes.mjs';
import mascotaRoutes from './mascotaRoutes.mjs';
import roleRoutes from './roleRoutes.mjs'; // ← nuevo

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/refugios', refugioRoutes);
router.use('/mascotas', mascotaRoutes);
router.use('/', roleRoutes); // ← sin prefijo: /roles y /permissions

export default router;
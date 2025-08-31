// src/routes/index.mjs
import express from 'express';
// Importa todos tus routers individuales
import mascotaRouter from './mascotaRoutes.mjs';
import refugioRouter from './refugioRoutes.mjs';
import authRouter from './authRouter.mjs';
import solicitudRouter from './solicitudRoutes.mjs';
import darAdopcionRouter from './solicitudDePublicacionRoutes.mjs';

const router = express.Router();

// Combina todos los routers usando los prefijos de ruta
router.use('/refugio', refugioRouter);
router.use('/mascota', mascotaRouter);
router.use('/usuario', authRouter);
router.use('/adoptar', solicitudRouter);
router.use('/darAdopcion', darAdopcionRouter); // Asumo que es el mismo router de solicitud de publicación

// Exporta el router combinado para que server.mjs pueda usarlo
export default router;
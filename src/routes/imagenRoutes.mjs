import express from 'express';
import * as imagenController from '../controllers/imagenController.mjs';

const router = express.Router();

router.post('/mascotas/:id/imagen', imagenController.subirImagenMascotaController);
router.post('/refugios/:id/imagen', imagenController.subirImagenRefugioController);
router.post('/usuarios/:id/imagen', imagenController.subirImagenUsuarioController);

export default router;
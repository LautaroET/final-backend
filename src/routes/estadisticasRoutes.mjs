import express from 'express';
import { obtenerEstadisticasController } from '../controllers/estadisticasController.mjs';

const router = express.Router();

router.get('/stats', obtenerEstadisticasController);

export default router;
import express from 'express';
import {
  obtenerSolicitudesController,
  crearSolicitudController,
  obtenerSolicitudPorIdController,
  actualizarSolicitudController,
  eliminarSolicitudController,
  obtenerSolicitudesPorRefugioController,
  obtenerSolicitudesPorUsuarioController
} from '../controllers/solicitudController.mjs';
import { solicitudValidationRules } from '../middleware/solicitudValidator.mjs';
import { handleValidationErrors } from '../middleware/errorMiddleware.mjs';
import {authenticateToken} from '../middleware/authMiddleware.mjs'

const router = express.Router();

router.get('/', authenticateToken, obtenerSolicitudesController);
router.post('/', authenticateToken, solicitudValidationRules(), handleValidationErrors, crearSolicitudController);
router.get('/:id', authenticateToken, obtenerSolicitudPorIdController);
router.put('/:id', authenticateToken, solicitudValidationRules(), handleValidationErrors, actualizarSolicitudController);
router.delete('/:id', authenticateToken, eliminarSolicitudController);
router.get('/refugios/:refugioId', authenticateToken, obtenerSolicitudesPorRefugioController);
router.get('/usuarios/:usuarioId', authenticateToken, obtenerSolicitudesPorUsuarioController);

export default router;

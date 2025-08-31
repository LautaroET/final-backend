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

router.get('/',authenticateToken, obtenerSolicitudesController);
router.post('/solicitudes',authenticateToken, solicitudValidationRules(), handleValidationErrors, crearSolicitudController);
router.get('/solicitudes/:id',authenticateToken, obtenerSolicitudPorIdController);
router.put('/solicitudes/:id',authenticateToken, solicitudValidationRules(), handleValidationErrors, actualizarSolicitudController);
router.delete('/solicitudes/:id',authenticateToken, eliminarSolicitudController);
router.get('/refugios/:refugioId/solicitudes',authenticateToken, obtenerSolicitudesPorRefugioController);
router.get('/usuarios/:usuarioId/solicitudes',authenticateToken, obtenerSolicitudesPorUsuarioController);

export default router;
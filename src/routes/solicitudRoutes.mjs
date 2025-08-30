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
import { handleValidationErrors } from '../middleware/validationMiddleware.mjs';

const router = express.Router();

router.get('/solicitudes', obtenerSolicitudesController);
router.post('/solicitudes', solicitudValidationRules(), handleValidationErrors, crearSolicitudController);
router.get('/solicitudes/:id', obtenerSolicitudPorIdController);
router.put('/solicitudes/:id', solicitudValidationRules(), handleValidationErrors, actualizarSolicitudController);
router.delete('/solicitudes/:id', eliminarSolicitudController);
router.get('/refugios/:refugioId/solicitudes', obtenerSolicitudesPorRefugioController);
router.get('/usuarios/:usuarioId/solicitudes', obtenerSolicitudesPorUsuarioController);

export default router;
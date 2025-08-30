import express from 'express';
import {
  obtenerSolicitudesController,
  crearSolicitudController,
  obtenerSolicitudPorIdController,
  responderSolicitudController,
  eliminarSolicitudController,
  obtenerSolicitudesPorRefugioController,
  obtenerSolicitudesPorUsuarioController
} from '../controllers/solicitudDePublicacionController.mjs';
import { solicitudDePublicacionValidationRules } from '../middleware/solicitudDePublicacionValidator.mjs';
import { handleValidationErrors } from '../middleware/validationMiddleware.mjs';

const router = express.Router();

router.get('/solicitudes-publicacion', obtenerSolicitudesController);
router.post(
  '/solicitudes-publicacion',
  solicitudDePublicacionValidationRules(),
  handleValidationErrors,
  crearSolicitudController
);
router.get('/solicitudes-publicacion/:id', obtenerSolicitudPorIdController);
router.put(
  '/solicitudes-publicacion/:id/responder',
  body('estado').isIn(['aceptada', 'rechazada']).withMessage('Estado inválido'),
  body('respuesta').optional().trim().escape(),
  handleValidationErrors,
  responderSolicitudController
);
router.delete('/solicitudes-publicacion/:id', eliminarSolicitudController);
router.get('/refugios/:refugioId/solicitudes-publicacion', obtenerSolicitudesPorRefugioController);
router.get('/usuarios/:usuarioId/solicitudes-publicacion', obtenerSolicitudesPorUsuarioController);

export default router;
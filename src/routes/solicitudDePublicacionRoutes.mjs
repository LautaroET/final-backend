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
import { handleValidationErrors } from '../middleware/errorMiddleware.mjs';
import { body } from 'express-validator';
import {authenticateToken} from '../middleware/authMiddleware.mjs'

const router = express.Router();

router.get('/',authenticateToken, obtenerSolicitudesController);
router.post(
  '/solicitudes-publicacion',authenticateToken,
  solicitudDePublicacionValidationRules(),
  handleValidationErrors,
  crearSolicitudController
);
router.get('/solicitudes-publicacion/:id',authenticateToken, obtenerSolicitudPorIdController);
router.put(
  '/solicitudes-publicacion/:id/responder',authenticateToken,
  body('estado').isIn(['aceptada', 'rechazada']).withMessage('Estado inválido'),
  body('respuesta').optional().trim().escape(),
  handleValidationErrors,
  responderSolicitudController
);
router.delete('/solicitudes-publicacion/:id',authenticateToken, eliminarSolicitudController);
router.get('/refugios/:refugioId/solicitudes-publicacion',authenticateToken, obtenerSolicitudesPorRefugioController);
router.get('/usuarios/:usuarioId/solicitudes-publicacion',authenticateToken, obtenerSolicitudesPorUsuarioController);

export default router;
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

router.get('/', authenticateToken, obtenerSolicitudesController);
router.post(
  '/',
  authenticateToken,
  solicitudDePublicacionValidationRules(),
  handleValidationErrors,
  crearSolicitudController
);
router.get('/:id', authenticateToken, obtenerSolicitudPorIdController);
router.put(
  '/:id/responder',
  authenticateToken,
  body('estado').isIn(['aceptada', 'rechazada']).withMessage('Estado inválido'),
  body('respuesta').optional().trim().escape(),
  handleValidationErrors,
  responderSolicitudController
);
router.delete('/:id', authenticateToken, eliminarSolicitudController);
router.get('/refugios/:refugioId', authenticateToken, obtenerSolicitudesPorRefugioController);
router.get('/usuarios/:usuarioId', authenticateToken, obtenerSolicitudesPorUsuarioController);

export default router;

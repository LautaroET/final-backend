// src/routes/refugioRoutes.mjs
import express from 'express';
import {
  obtenerRefugiosController,
  crearRefugioController,
  obtenerRefugioPorIdController,
  actualizarRefugioController,
  eliminarRefugioController,
} from '../controllers/refugioController.mjs';
import { refugioValidationRules } from '../middleware/refugioValidation.mjs';
import { handleValidationErrors } from '../middleware/errorMiddleware.mjs';
import { authenticateToken, hasPermission } from '../middleware/authMiddleware.mjs';
import { authorizeRefugioOwner } from '../middleware/authorizeResourceOwner.mjs';

const router = express.Router();

// Público
router.get('/', obtenerRefugiosController);
router.get('/:id', obtenerRefugioPorIdController);

// Solo usuarios con permiso "create_refugio" (refugio role)
router.post(
  '/refugios',
  authenticateToken,
  hasPermission('create_refugio'),
  refugioValidationRules(),
  handleValidationErrors,
  crearRefugioController
);

// Solo el dueño puede editar/eliminar su refugio
router.put(
  '/refugios/:id',
  authenticateToken,
  authorizeRefugioOwner,
  refugioValidationRules(),
  handleValidationErrors,
  actualizarRefugioController
);

router.delete(
  '/refugios/:id',
  authenticateToken,
  authorizeRefugioOwner,
  eliminarRefugioController
);

export default router;
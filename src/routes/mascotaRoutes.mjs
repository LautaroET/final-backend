import express from 'express';
import {
  obtenerMascotasController,
  crearMascotaController,
  obtenerMascotaPorIdController,
  actualizarMascotaController,
  eliminarMascotaController,
  obtenerMascotasPorRefugioController,
} from '../controllers/mascotaController.mjs';
import { mascotaValidationRules } from '../middleware/mascotaValidator.mjs';
import { handleValidationErrors } from '../middleware/errorMiddleware.mjs';
import { authenticateToken, hasPermission } from '../middleware/authMiddleware.mjs';
import { authorizeRefugioOwner } from '../middleware/authorizeResourceOwner.mjs';

const router = express.Router();

// Rutas públicas
router.get('/', obtenerMascotasController);
router.get('/:id', obtenerMascotaPorIdController);

// Solo usuarios con permiso "create_mascota" (refugio role)
router.post(
  '/',
  authenticateToken,
  hasPermission('create_mascota'),
  mascotaValidationRules(),
  handleValidationErrors,
  crearMascotaController
);

// Solo el dueño del refugio puede editar/eliminar sus mascotas
router.put(
  '/:id',
  authenticateToken,
  authorizeRefugioOwner,
  mascotaValidationRules(),
  handleValidationErrors,
  actualizarMascotaController
);

router.delete(
  '/:id',
  authenticateToken,
  authorizeRefugioOwner,
  eliminarMascotaController
);

// Solo refugio puede ver sus mascotas
router.get(
  '/refugios/:refugioId/mascota',
  obtenerMascotasPorRefugioController
);

export default router;

import express from 'express';
import {
  obtenerMascotasController,
  crearMascotaController,
  obtenerMascotaPorIdController,
  actualizarMascotaController,
  eliminarMascotaController,
  obtenerMascotasPorRefugioController
} from '../controllers/mascotaController.mjs';
import { mascotaValidationRules } from '../middleware/mascotaValidator.mjs';
import { handleValidationErrors } from '../middleware/errorMiddleware.mjs';

const router = express.Router();

router.get('/mascotas', obtenerMascotasController);
router.post(
  '/mascotas',
  mascotaValidationRules(),
  handleValidationErrors,
  crearMascotaController
);
router.get('/mascotas/:id', obtenerMascotaPorIdController);
router.put(
  '/mascotas/:id',
  mascotaValidationRules(),
  handleValidationErrors,
  actualizarMascotaController
);
router.delete('/mascotas/:id', eliminarMascotaController);
router.get('/refugios/:refugioId/mascotas', obtenerMascotasPorRefugioController);

export default router;
import express from 'express';
import {
  obtenerMascotasController,
  crearMascotaController,
  obtenerMascotaPorIdController,
  actualizarMascotaController,
  eliminarMascotaController,
  obtenerMascotasPorRefugioController
} from '../controllers/mascotaController.mjs';
import { mascotaValidationRules } from '../validation/mascotaValidation.mjs';
import { handleValidationErrors } from '../validation/errorMiddleware.mjs';

const router = express.Router();

router.get('/mascotas', obtenerMascotasController);
router.post('/mascotas', mascotaValidationRules(), handleValidationErrors, crearMascotaController);
router.get('/mascotas/:id', obtenerMascotaPorIdController);
router.put('/mascotas/:id', mascotaValidationRules(), handleValidationErrors, actualizarMascotaController);
router.delete('/mascotas/:id', eliminarMascotaController);

/* endpoint extra: listar mascotas de un refugio */
router.get('/refugios/:refugioId/mascotas', obtenerMascotasPorRefugioController);

export default router;